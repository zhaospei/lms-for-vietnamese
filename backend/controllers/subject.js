import Subject from "../models/subject.js";
import { Op } from "sequelize";
import sequelize from "../database/db.js";
import Class from "../models/class.js";
import UserScore from "../models/userScore.js";
import QueryTypes from "sequelize";
import SubjectLike from "../models/subjectLike.js";
import Document from "../models/document.js";
import { getPageLikes, getPageDislikes, getUserlikes } from "./page.js";
import AccessSubject from "../models/accessSubject.js"
import Score from "../models/score.js";
import Page from "../models/page.js";
import UserLike from "../models/userLike.js";
import { getDocumentById } from "./document.js";

export const getSubjectByName = async (req, res) => {
    try {
        let str = req.query.name;
        // console.log(req);
        const subjectList = await Subject.findAll({
            where: {
                Name: {
                    [Op.like]: `%${str}%`
                }
            }
        })
        res.status(200).json(subjectList);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getSubjectByCode = async (req, res) => {
    try {
        let str = req.query.code;
        console.log(req);
        const subjectList = await Subject.findAll({
            where: {
                Code: {
                    [Op.like]: `%${str}%`
                }
            },
            limit: typeof(req.query.limit) === 'undefined' ? req.query.limit : +req.query.limit
        })
        res.status(200).json(subjectList);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getSubjectInfo = async (req, res) => {
    try {
        let id = req.query.subjectId;
        const user = res.locals.decodedUser;
        const subjectList = await Subject.findOne({
            where: {
                Id: id
            },
            include: [Class]
        });
        let userLike = await getUserlikes(id, "S", user.Id);
        let subjectLike = await getPageLikes(id, 'S');
        let userScore = await UserScore.findOne({
            raw: true,
            where: {
                SubjectId: id,
                UserId: user.Id
            }
        });
        let score = 0, type = "registered"
        if (userScore == null) {score = {'final': null}; type = "all"}
        else {
            let sc = await Score.findOne({
                where: {
                    Id: userScore.ScoreId
                }
            });
            score = {'final': sc.total10};
        }
        let stared = true;
        if (userLike === null) stared = false;
        let result = {};
        result.id = subjectList.Id;
        result.code = subjectList.Code;
        result.name = subjectList.Name;
        result.credits = subjectList.Credit;
        result.score = score;
        result.type = type;
        result.like = subjectLike;
        result.documents = await getNumberDocument(id);
        result.stared = stared;
        result.lecturers = [];
        let curLect = [];
        for (let c of subjectList.Classes) {
            let teacher = c.Teacher;
            if (curLect.includes(teacher)) continue;
            result.lecturers.push({'name': teacher});
            curLect.push(teacher);
        }
        await saveSubjectAccessTime(id, user.Id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const getRegisteredSubjectInfo = async (req, res) => {
    try {
        let id = req.query.subjectId;
        const user = res.locals.decodedUser;
        const subject = await Subject.findOne({
            where: {
                Id: id
            },
            include: {
                model: Class
            }
        });

        let userScore = await UserScore.findOne({
            raw: true,
            where: {
                SubjectId: id,
                UserId: user.Id
            },
            include: Score
        });
        let result = {};
        result.code = subject.Code;
        result.id = subject.Id;
        result.name = subject.Name;
        result.credits = subject.Credit;
        result.score = {};
        if (userScore === null) {
            result.score.midTerm = {'score': 0, 'weight': 0};
            result.score.finalTerm = {'score': 0, 'weight': 0};
            result.score.final = 0;
            // result.semesterId = 10;
        } else {
            result.score.midTerm = {'score': userScore['Score.midExamScore'], 'weight': userScore['Score.midExamWeight']};
            result.score.finalTerm = {'score': userScore['Score.finalExamScore'], 'weight': userScore['Score.finalExamWeight']};
            result.score.final = userScore['Score.total10'];
            result.semesterId = userScore.SemesterId;
        }
    
        result.type = "registered";
        result.lecturer = subject.Classes[0].Teacher;
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const getSubjectHaveNotLearn = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let learnedArray = await UserScore.findAll({
            raw: true,
            where: {
                UserId: user.Id
            },
            include: [Subject],
        })
        let courses = [];
        for (let c of learnedArray) {
            courses.push(c["Subject.Code"]);
        }
        let result = await Subject.findAll({
            raw: true,
            where: {
                Code: {
                    [Op.notIn]: courses
                }
            },
            attributes: ['Name', 'Code', 'Credit']
        })

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message)
    }
}

async function saveSubjectAccessTime(subjectId, userId) {
    try {
        let theLast = await AccessSubject.findOne({
            where: {
                SubjectId: subjectId,
                UserId: userId,
            }
        });
        if (theLast === null) {
            let newAccess = await AccessSubject.create({
                SubjectId: subjectId,
                UserId: userId,
            });
            await newAccess.save();
        } else {
            theLast.LastAccess =  sequelize.literal('CURRENT_TIMESTAMP');
            await theLast.save();
        }
    } catch(err) {
        throw err;
    }

}

async function getLastAccessTime(subjectId, userId) {
    try {
        let theLast = await AccessSubject.findOne({
            where: {
                SubjectId: subjectId,
                UserId: userId,
            }
        });
        if (theLast === null) {
            return null;
        } else {
           return theLast.LastAccess;
        }
    } catch(err) {
        throw err;
    }
}

async function getNumberDocument(subjectId) {
    try {
        let num = await Document.count({
            where: {
                SubjectId: subjectId
            }
        });
        return num;
    } catch (err) {
        throw err;
    }
}

export const getPartSubject = async (req, res) => {
    try {
        let str = req.body.searchValue;
        let sb = req.body.sortBy;
        const user = res.locals.decodedUser;
        let st = parseInt(req.body.from);
        let end = parseInt(req.body.to);
        let orderBy = "AccessSubjects.LastAccess DESC";
        if (sb === 'stared') {
            orderBy = "stared DESC";
        } else if (sb === 'rating') {
            orderBy = "'like' DESC";
        }
        
       
        const subjectList = await sequelize.query(`SELECT
            Subjects.Id AS id,
            Subjects.Name AS name,
            Code AS code,
            Credit AS credits,
            AccessSubjects.LastAccess as getLastAccessTime,
            COUNT(DISTINCT Documents.Id) AS documents,
            COUNT(DISTINCT UserLikes.Id) AS 'like',
            MAX(CASE WHEN UserLikes.UserId = ${user.Id} THEN 1 ELSE 0 END) AS stared
        FROM
            Subjects
        LEFT JOIN AccessSubjects ON Subjects.Id = AccessSubjects.SubjectId AND AccessSubjects.UserId = ${user.Id}
        LEFT JOIN Documents ON Documents.SubjectId = Subjects.Id
        LEFT JOIN UserLikes ON UserLikes.PageId = Subjects.Id
        WHERE
            Subjects.Name LIKE '%${str}%'
        GROUP BY
            Subjects.Id, Name, Code, Credit, AccessSubjects.LastAccess
        ORDER BY
            ${orderBy}
        LIMIT
            ${st - 1}, ${end - st + 1};`,  {  model: Subject });
    

    console.log(await getPageLikes(1, 'S'));
    console.log(await getNumberDocument(1))
    res.status(200).json(subjectList);
    
    } catch (err) {
        res.status(500).json(err);
    }
}
