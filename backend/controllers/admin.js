import User from "../models/user.js"
import Authentication from '../middlewares/authentication.js'
import UserDTO from '../dto/users.js'
import UserHandleDTO from '../dto/userHandle.js'
import { Op } from 'sequelize'
import { crawlAllCourseWithInitMark } from "../middlewares/crawlCourse.js"
import nodemailer from "nodemailer";
import jwt, { decode } from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const registerUser = async (req, res) => {
    try {
        const { name, studentid, password } = req.body;
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
        crawlAllCourseWithInitMark(createUser);
        res.status(201).send({
            message: 'User successfully created',
            StudentId: createUser.StudentId,
        })
        res.status(201).send({
            message: 'User successfully created',
            StudentId: createUser.StudentId,
        })

    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserHandles = async (req, res) => {
    // try {
        // const decodedUser = res.locals.decodedUser
        // console.log(decodedUser)
        const { offset, limit } = req.query

        // Find all users which are not equal to userId
        const users = await User.findAll({ 
            offset: parseInt(offset), 
            limit: parseInt(limit) 
        })

        // console.log(users)
        const studentInfoList = await Promise.all(users.map( async (user) => {
            // console.log(comment)
            // const commentModel = await Comment.findByPk(user.CommentId)
            const userDTO = await UserHandleDTO.convertToDto(user);
            return userDTO;
        }));
        // const studentInfoList = users.map((user) => UserHandleDTO.convertToDto(user))

        res.status(200).send(studentInfoList)
    // } catch (error) {
    //     res.status(500).send(error)
    // }
}


// export const resetPassword = async (req, res) => {
//     try {
//         // console.log(req.body)
//         const token = req.params.token;
//         const { password } = req.body;
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//         console.log(decodedToken)
//         const { studentid } = decodedToken;
//         const salt = bcrypt.genSaltSync(10)
//         const passwordHash = bcrypt.hashSync(password, salt)
//         const updatedUser = await User.update(
//             {
//                 PasswordHash: passwordHash
//             },
//             { returning: true, where: { StudentId: studentid } }
//         )
//         if (updatedUser) {
//             res.status(200).send({ message: 'The password has been updated.' })
//         } else {
//             res.status(500).send({ error: 'Failed to update the password.' })
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }


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

export const modifyUser = async (req, res) => {
    try {
        // body has id, name, avatar, birth
        const { body } = req

        const updatedUser = await User.update(
            {
                Name: body.name,
                Avatar: body.avatar,
                Birth: body.birth,
            },
            { returning: true, where: { Id: body.id } }
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
        // const loggedInUser = res.locals.decodedUser
        const { body } = req

        const deleteUser = await User.destroy({
            where: { Id: body.id },
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
