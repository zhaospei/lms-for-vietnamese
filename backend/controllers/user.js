import User from "../models/user.js"
import Authentication from '../middlewares/authentication.js'
import UserDTO from '../dto/users.js'
import UserHandleDTO from '../dto/userHandle.js'
import { Op } from 'sequelize'
// import { crawlAllCourseWithInitMark } from "../middlewares/crawlCourse.js"
// import { autoCreateEventClass } from "./schedule.js"
import nodemailer from "nodemailer";
import jwt, { decode } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


export const registerUser = async (req, res) => {
    try {
        const { name, studentid, password } = req.body;
        const ipAddress = req.connection.remoteAddress
        const ipPort = req.connection.remotePort
        const url = req.headers.host;
        console.log(url);
        const duplicateStudentId = await User.findOne({
            where: {
                StudentId: studentid,
            },
        })

        if (duplicateStudentId) {
            res.status(409).send({ error: 'StudentId has already been taken' })
            return
        }

        const token = jwt.sign({ name, studentid, password }, process.env.JWT_SECRET, { expiresIn: '30m' });
        const output = `
        <h2>Vui lòng ấn vào link phía dưới để kích hoạt tài khoản</h2>
        <p>${process.env.CLIENT_URL}/signup/activate?token=${token}</p>
        <p><b>NOTE: </b> Link kích hoạt phía trên có giới hạn trong 30 phút.</p>
        `;
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // const mailName = studentid + "@" + process.env.EMAIL_ORG
        const mailName = studentid

        const mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: mailName, // receiver email
            subject: "Kích hoạt tài khoản sử dụng Trang web: Chinh phục ngữ văn 10", // Subject line
            text: output,
            html: output,
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Mail sent : %s', info.response);
            }
        })

        res.status(201).send({
            message: 'Email send successfully',
            StudentId: studentid,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const activateAccount = async (req, res) => {
    const token = req.params.token;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const { name, studentid, password } = decodedToken;
        const duplicateStudentId = await User.findOne({
            where: {
                StudentId: studentid,
            },
        })

        if (duplicateStudentId) {
            res.status(409).send({ error: 'StudentId has already been taken' })
            return
        }
        const createUser = await User.create({
            Name: name,
            StudentId: studentid,
            PasswordHash: password,
        })
        const salt = bcrypt.genSaltSync(10)
        createUser.PasswordHash = bcrypt.hashSync(createUser.PasswordHash, salt)
        await createUser.save();
        // crawlAllCourseWithInitMark(createUser);
        // autoCreateEventClass(createUser);
        res.status(201).send({
            message: 'User successfully created',
            StudentId: createUser.StudentId,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserHandles = async (req, res) => {
    try {
        const decodedUser = res.locals.decodedUser
        // console.log(decodedUser)

        // Find all users which are not equal to userId
        const users = await User.findAll({
            where: {
                Id: {
                    [Op.ne]: decodedUser.Id,
                },
            },
        })

        // console.log(users)

        const studentids = users.map((user) => UserHandleDTO.convertToDto(user))

        res.status(200).send({
            studentids,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { studentid } = req.body;

        if (!studentid) {
            res.status(409).send({ error: 'Please enter an student id' })
        }

        const studentHandle = await User.findOne({
            where: {
                StudentId: studentid,
            },
        })

        if (!studentHandle) {
            res.status(409).send({ error: 'StudentId does not exist!' })
            return
        }

        const token = jwt.sign({studentid:  studentid}, process.env.JWT_SECRET, { expiresIn: '30m' });
        const output = `
        <h2>Please click on below link to reset your account password</h2>
        <p>${process.env.CLIENT_URL}/resetpassword?token=${token}</p>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        `;
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailName = studentid + "@" + process.env.EMAIL_ORG

        const mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: mailName, // receiver email
            subject: "[Chinh phục chuyên đề ngữ văn 10] Đổi mật khẩu", // Subject line
            text: output,
            html: output,
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Mail sent : %s', info.response);
            }
        })

        res.status(201).send({
            message: 'Email send successfully',
            StudentId: studentid,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}


export const resetPassword = async (req, res) => {
    try {
        console.log(req.body)
        const token = req.params.token;
        const { password } = req.body;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken)
        const { studentid } = decodedToken;
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        const updatedUser = await User.update(
            {
                PasswordHash: passwordHash
            },
            { returning: true, where: { StudentId: studentid } }
        )
        if (updatedUser) {
            res.status(200).send({ message: 'The password has been updated.' })
        } else {
            res.status(500).send({ error: 'Failed to update the password.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


export const getUsersByStudentId = async (req, res) => {
    try {
        const { params } = req
        // console.log(params)
        const user = await User.findOne({
            where: {
                studentid: params.studentid,
            },
        })
        if (!user) {
            res.status(404).send({
                error: `User '${params.studentid}' not found`,
            })
            return
        }

        const userDTO = await UserDTO.convertToDto(user)
        res.status(200).send(userDTO)
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOne({
            attributes: ['Id', 'Name', 'StudentId', 'PasswordHash', 'Role'],
            where: {
                StudentId: body.studentid,
            },
        })

        // if (!user || !user.validatePassword(body.password)) {
        //     res.status(401).send({
        //         error: 'Incorrect studentid or password',
        //     })
        //     return
        // }
        if (!user) {
            res.status(403).send({
                error: 'Not found account',
            })
            return
        } 
        if (!user.validatePassword(body.password)) {
            res.status(401).send({
                error: 'Incorrect studentid or password',
            })
            return
        }

        // console.log(user)

        const authToken = Authentication.generateAuthToken(user)
        // res.cookie('authToken', authToken, {
        //     httpOnly: true,
        //     secure: false,
        //     path: "/",
        //     sameSite: "strict",
        //     expires: new Date(253402300000000)
        // })
        res.status(200).send({
            message: 'Authentication successful',
            authToken,
            studentid: user.studentid,
            role: user.Role === 1 ? 'admin' : 'user',
        })
    } catch (error) {
        res.status(500).send({ 'Error message': error.toString() })
    }
}

export const modifyUser = async (req, res) => {
    try {
        const loggedInUser = res.locals.decodedUser
        // console.log(loggedInUser)
        const { body } = req

        // console.log(loggedInUser.Id)

        const updatedUser = await User.update(
            {
                Name: body.name,
                Avatar: body.avatar,
                Birth: body.birth,
            },
            { returning: true, where: { Id: loggedInUser.Id } }
        )

        if (updatedUser) {
            res.status(200).send({ message: 'The profile has been updated.' })
        } else {
            res.status(500).send({ error: 'Failed to update the profile.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const loggedInUser = res.locals.decodedUser

        const deleteUser = await User.destroy({
            where: { Id: loggedInUser.Id },
        })

        if (deleteUser !== 0) {
            res.status(200).send({ message: 'The user has been deleted.' })
        } else {
            res.status(500).send({ error: 'Failed to destroy the user.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const changePassword = async (req, res) => {
    try {
        const { body } = req
        console.log(body)
        const user = await User.findOne({
            where: {
                StudentId: body.studentid,
            },
        })
        if (!user || !user.validatePassword(body.oldpassword)) {
            res.status(401).send({
                error: 'Incorrect old password',
            })
            return
        }

        if (body.oldpassword == body.newpassword) {
            res.status(401).send({message: 'The old password and new password are the same.'})
        }

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(body.newpassword, salt)
        // console.log(passwordHash)
        const updatedUser = await User.update(
            {
                PasswordHash: passwordHash
            },
            { returning: true, where: { StudentId: body.studentid } }
        )
        if (updatedUser) {
            res.status(200).send({ message: 'The password has been updated.' })
        } else {
            res.status(500).send({ error: 'Failed to update the password.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const changeAvatar = async (req, res) => {
    try {
        const decodedUser = res.locals.decodedUser;
        let user = await User.findOne({
            where: {
                Id: decodedUser.Id
            }
        });
        user.Avatar = req.file.path;
        await user.save();
        res.status(200).json("Changed successfully");
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const changeBio = async(req, res) => {
    try {
        let bio = req.body.bio;
        console.log(bio);
        let decodedUser = res.locals.decodedUser;
        let user = await User.findOne({
            where: {
                Id: decodedUser.Id
            }
        });
        // console.log(user);
        user.Bio = bio;
        await user.save();
        res.status(200).json("changed successfully!")
    } catch (err) {
        res.status(500).json(err);
    }
}

export const changeScore = async(req, res) => {
    try {
        let score = req.body.score;
        console.log(score);
        let decodedUser = res.locals.decodedUser;
        let user = await User.findOne({
            where: {
                Id: decodedUser.Id
            }
        });
        // console.log(user);
        if (user.Score < score) {
            user.Score = score;
        }
        await user.save();
        res.status(200).json("changed successfully!")
    } catch (err) {
        res.status(500).json(err);
    }
}


// export const getScore = async(req, res) => {
//     try {
//         let score = req.body.score;
//         console.log(score);
//         let decodedUser = res.locals.decodedUser;
//         let user = await User.findOne({
//             where: {
//                 Id: decodedUser.Id
//             }
//         });
//         // console.log(user);
//         if (user.Score < score) {
//             user.Score = score;
//         }
//         await user.save();
//         res.status(200).json("changed successfully!")
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }


