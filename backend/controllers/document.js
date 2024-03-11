import Document from "../models/document.js";
import User from "../models/user.js";
import Subject from "../models/subject.js";
import { getPageLikes } from "./page.js";
//import uploadCloud from "../middlewares/cloud.js";

export const createSanPham = async (req, res) => {
    try {
        const body = JSON.parse(req.body.request);
        console.log(body)
        const user = res.locals.decodedUser;
        // try {
        const newDocument = await Document.create({
                Name: body.name,
                Category: "1",
                Content: body.content,
                UserId: user.Id,
                Link: req.file.path,
                SubjectId: 2
            });
        await newDocument.save();
        // } catch (err) {
        //     // for (let file of req.files) {
        //     //     if (file) {
        //     //         cloudinary.uploader.destroy(file.filename);
        //     //     }
        //     // }
        //     res.status(500).json(err.message);
        //     return;
        // }

        // for (let i = 1; i < req.files.length; i++) {
        //     let file = req.files[i];
        //     let newDocument = await Document.create({
        //         Name: body.name,
        //         Category: body.category,
        //         Link: file.path,
        //         UserId: user.Id,
        //         SubjectId: body.subjectId
        //     });
        //     await newDocument.save();
        // }
        // console.log(newDocument)
        res.status(200).send({
            message: 'Comment successfully created',
            CommentId: newDocument.Id,
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const createDocument = async (req, res) => {
    try {
        const body = req.body
        console.log(body)
        const user = res.locals.decodedUser;
        // try {
        const newDocument = await Document.create({
                Name: body.name,
                Category: "1",
                Content: body.content,
                UserId: user.Id,
                Link: "abc.xyz",
                SubjectId: 1
            });
        await newDocument.save();
        // } catch (err) {
        //     // for (let file of req.files) {
        //     //     if (file) {
        //     //         cloudinary.uploader.destroy(file.filename);
        //     //     }
        //     // }
        //     res.status(500).json(err.message);
        //     return;
        // }

        // for (let i = 1; i < req.files.length; i++) {
        //     let file = req.files[i];
        //     let newDocument = await Document.create({
        //         Name: body.name,
        //         Category: body.category,
        //         Link: file.path,
        //         UserId: user.Id,
        //         SubjectId: body.subjectId
        //     });
        //     await newDocument.save();
        // }
        // console.log(newDocument)
        res.status(200).send({
            message: 'Comment successfully created',
            CommentId: newDocument.Id,
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const getDocumentById = async (req, res) => {
    try {
        const docId = req.query.id;
        const doc = await Document.findOne({
            where: {
                Id: docId
            }
        })
        if (doc === null) {
            res.status(404).json("Not found document");
        } else {
            let user = await User.findOne({
                raw: true,
                where: {
                    Id: doc.UserId,
                }
            });
            // let subject = await Subject.findOne({
            //     raw: true,
            //     where: {
            //         Id: doc.SubjectId
            //     }
            // });
            if (user === null ) {
                res.status(404).json("Cannot find document because it is invalid.");
            } else {
                let tmp = {};
                tmp.id = doc.Id;
                tmp.name = doc.Name;
                tmp.createdAt = Date.parse(doc.CreatedAt);
                // tmp.like = await getPageLikes(doc.Id, 'D');
                // tmp.download = doc.Download;
                // tmp.category = doc.Category;
                tmp.link = doc.Link;
                tmp.content = doc.Content;
                tmp.userId = user.Id;
                tmp.studentId= user.StudentId;
                tmp.userName = user.Name;
                // tmp.subject = subject.Name;
                // tmp.subjectId = subject.Id;
                res.status(200).json(tmp);
            }

        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}


export const getDocumentOfSubject = async (req, res) => {
    try {
        let subjectId = req.query.subjectId;
        let documentList = req.query.limit ? await Document.findAll({
            raw: true,
            where: {
                SubjectId: subjectId
            },
            order: ['CreatedAt', 'DESC'],
            limit: +req.query.limit
        }) : await Document.findAll({
            raw: true,
            where: {
                SubjectId: subjectId
            },
            order: [
                ['CreatedAt', 'DESC'],
            ]
        });
        let result = [];
        for (let c of documentList) {
            let user = await User.findOne({
                raw: true,
                where: {
                    Id: c.UserId,
                }
            });
            let tmp = {};
            tmp.id = c.Id;
            tmp.name = c.Name;
            tmp.createdAt = Date.parse(c.CreatedAt);
            // tmp.like = await getPageLikes(c.Id, 'D');
            // tmp.download = c.Download;
            // tmp.category = c.Category;
            tmp.link = c.Link;
            tmp.content = c.Content;
            tmp.userName = user.Name;
            tmp.studentId = user.StudentId;

            result.push(tmp);
        }
        res.status(200).json(result);
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }



}

export const getMyDocumentByStudentId = async(req, res) => {
    try {
        let studentId = req.query.studentId;
        let user = await User.findOne({
            raw: true,
            where: {
                StudentId: studentId
            }
        });
        if (user === null) {
            res.status(404).json("User not found");
            return;
        }
        console.log(user.Id);
        let documentList = await Document.findAll({
            raw: true,
            where: {
                UserId: user.Id
            },
            include: [Subject]
        });
        let result = [];
        for (let c of documentList) {
            let tmp = {};
            tmp.id = c.Id;
            tmp.name = c.Name;
            tmp.createdAt = c.CreatedAt;
            tmp.like = await getPageLikes(c.Id, 'D');
            tmp.download = c.Download;
            tmp.category = c.Category;
            tmp.link = c.Link;
            tmp.subjectName = c["Subject.Name"];
            tmp.subjectId = c["Subject.Id"];

            result.push(tmp);
        }
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
}

export async function dumpUpload(req, res) {
    res.status(200).json({ok: true})
}
