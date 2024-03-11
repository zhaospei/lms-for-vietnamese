import UserScore from "../models/userScore.js";
import Score from "../models/score.js";
import Subject from "../models/subject.js";
import Semester from "../models/semester.js";
import { Op } from "sequelize";
import sequelize from "../database/db.js";

export async function semesterInfoById(userId, id) {
    try {
        let result = {};
        let sem = await Semester.findOne({
            raw: true,
            where: {
                Id: id
            }
        });

        if (! sem) {
            return {};
        }
        result.id = sem.Id;
        result.title = sem.Name;
        result.subjects = [];
        result.sumOfCredits = 0;
        result.semesterGPA = 0.0;
        result.semesterGPA4 = 0.0;
        result.totalMark10 = 0.0;
        result.cnt = 0.0;
        result.totalMark4 = 0.0;
        result.yearGPA = 0.0;
        let data = await UserScore.findAll({
            raw: true,
            where: {
                UserId: userId,
                SemesterId: id
            },
            include: [Semester, Score, Subject],
        });
        let tmp = 0;
        for (let c of data) {
            let subj = {};
            let sco = {};
            // subj.userScoreId = c['Id'];
            subj.id = c["Subject.Id"];
            subj.code = c["Subject.Code"];
            subj.name = c["Subject.Name"];
            subj.credits = c["Subject.Credit"];
            // subj.type = "registered";
            subj.semesterId = result.id;

            sco.midTerm = {score: c["Score.midExamScore"], weight: c["Score.midExamWeight"]};
            sco.finalTerm = {score: c["Score.finalExamScore"], weight: c["Score.finalExamWeight"]};
            sco.final = c["Score.total10"];
            sco.final4 = c["Score.total4"];
            subj.score = sco;
            result.subjects.push(subj);
            if (subj.code.startsWith("PES") == false) {

                result.sumOfCredits += subj.credits;
                result.totalMark10 += sco.final * subj.credits;
                result.totalMark4 += sco.final4 * subj.credits;
            } else {
                tmp += subj.credits;
            }
        }
        result.semesterGPA = result.totalMark10 / result.sumOfCredits;
        result.semesterGPA4 = result.totalMark4 / result.sumOfCredits;
        result.cnt = result.sumOfCredits;
        result.sumOfCredits += tmp;
        result.yearGPA = await calYearGPA(userId, id);
        // console.log("yearGPA: ", result.yearGPA);
        return result;

    } catch (err) {
        return err.message;
    }

}

export const getSemesterInfoById = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let {params} = req;
        // let userScores = await
        let result = await semesterInfoById(user.Id, params.semesterId);
        delete result.cnt;
        delete result.totalMark10;
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getAllSemesterInfo = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let semId = await Semester.findAll({
            raw: true,
        });

        let result = {};
        result.totalGPA = 0.0;
        result.credits = 0;
        result.totalGPA4 = 0.0;
        result.semesterInfo = [];

        result.cnt = 0;
        for (let c of semId) {

            let semInfo = await semesterInfoById(user.Id, c.Id);
            if (! semInfo) {
                continue;
            } else {
                result.credits += semInfo.sumOfCredits;
                result.cnt += semInfo.cnt;
                result.totalGPA += semInfo.totalMark10;
                result.totalGPA4 += semInfo.totalMark4;
                delete semInfo.cnt;
                delete semInfo.totalMark10;
                console.log(semInfo);
                if (semInfo.subjects.length > 0) {
                    result.semesterInfo.push(semInfo);
                }
            }
        }
        if (result.cnt > 0) {
            result.totalGPA /= result.cnt;
            result.totalGPA4 /= result.cnt;
        }
        delete result.cnt;
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }

}

/** Update course scores in semester */
export const updateSemesterCourseList = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let semId = req.body.semesterId;
        let subjects = req.body.subjects;
        // console.log(subjects);
        // let subjectCodes = subjects.map(c => c.id);
        // console.log(subjectCodes);
        let subjectInfo = [];
        for (let c of subjects) {
            let cCode = c.code;
            let cInfo = await Subject.findOne({
                raw: true,
                where: {
                    Code: cCode
                }
            });
            if (cInfo !== null) {
                subjectInfo.push(cInfo);
            }
        }

        let subIds = subjectInfo.map(c => c.Id);
        // console.log(subjects);
        // console.log(subjectInfo);
        // console.log(subIds);
        let userScores = await UserScore.findAll({
            where: {
                UserId: user.Id,
                SubjectId: {
                    [Op.in]: subIds,
                },
                SemesterId: semId
            },
        });

        /// delete old scores
        for (let c of userScores) {
            await c.destroy();
        }

        /// Add new scores to database
        for (let i = 0; i < subjects.length; i++) {
            let registeredSubject = subjects[i];
            let subInfo = subjectInfo[i];
            const newScore = await Score.create({
                midExamScore: registeredSubject.score.midTerm.score,
                midExamWeight: registeredSubject.score.midTerm.weight,
                finalExamScore: registeredSubject.score.finalTerm.score,
                finalExamWeight: registeredSubject.score.finalTerm.weight,
                total10: registeredSubject.score.final
            });
            await newScore.save();

            let scoreId = newScore.Id;
            const newUserScore = await UserScore.create({
                UserId: user.Id,
                SubjectId: subInfo.Id,
                ScoreId: scoreId,
                SemesterId: semId
            });
            await newUserScore.save();

        }

        // let newGPA = calGPA(subjects);
        res.status(200).json({ok: true});
    } catch(err) {
        res.status(500).json(err.message);
    }
}

function changeMark(mark10) {
    if (mark10 < 4.0) return 0.0;
    if (mark10 < 5.0) return 1.0;
    if (mark10 < 5.5) return 1.5;
    if (mark10 < 6.5) return 2.0;
    if (mark10 < 7.0) return 2.5;
    if (mark10 < 8.0) return 3.0;
    if (mark10 < 8.5) return 3.5;
    if (mark10 < 9.0) return 3.7;
    return 4.0;
}

function calGPA(listOfSubjects) {
    let total = 0.0;
    let credits = 0;
    for (let c of listOfSubjects) {
        if (c.code.startsWith("PES")) continue;
        credits += c.credits;
        total += changeMark(c.score.final) * c.credits;
    }
    if (credits == 0) return 0;
    return (total / credits);
}

async function calTempAllGPA(listOfSubjects, userId, semId) {
    let totalScore = await UserScore.findAll({
        raw: true,
        where: {
            UserId: userId,
            SemesterId: {
                [Op.ne]: semId
            }
        },
        include: [Score, Subject],
        attributes: ['Subject.Credit', 'Subject.Code', 'Score.total10']
    });
    // console.log(totalScore);
    let total10 = 0.0;
    let cres = 0;
    for (let c of totalScore) {
        if (c.Code.startsWith("PES")) continue;
        total10 += c.total10 * c.Credit;
        cres += c.Credit;
    }
    for (let c of listOfSubjects) {
        if (c.code.startsWith("PES")) continue;
        cres += c.credits;
        total10 += c.score.final * c.credits;
    }
    if (cres == 0) return 0;
    // console.log(cres);
    return (total10 / cres);

}

/** Get GPA in a year */
async function calYearGPA(Id, ssemId) {
    try {
        let allSem = [];
        let semId = parseInt(ssemId);
        if (semId % 3 == 1) {
            allSem.push(semId);  allSem.push(semId + 1); allSem.push(semId + 2);
        } else if (semId % 3 == 0) {
            allSem.push(semId - 2); allSem.push(semId - 1); allSem.push(semId);
        } else {
            allSem.push(semId - 1); allSem.push(semId); allSem.push(semId + 1);
        }
        // console.log("allSem:",allSem);
        let totalScore = await UserScore.findAll({
            raw: true,
            where: {
                UserId: Id,
                SemesterId: {
                    [Op.in]: allSem
                }
            },
            include: [Score, Subject],
            attributes: ['Subject.Credit', 'Subject.Code', 'Score.total4']
        });
        // console.log(totalScore);
        let total4 = 0.0;
        let cres = 0;
        for (let c of totalScore) {
            if (c.Code.startsWith("PES")) continue;
            total4 += c.total4 * c.Credit;
            cres += c.Credit;
        }
        if (cres == 0) return 0;
        return (total4 / cres);


    } catch(err) {
        throw err;
    }
}

/** Get temparary GPA in a year */
async function calTempYearGPA(listOfSubjects, userId, ssemId) {
    try {
        let allSem = [];
        let semId = parseInt(ssemId);
        if (semId % 3 == 1) {
            allSem.push(semId + 1); allSem.push(semId + 2);
        } else if (semId % 3 == 0) {
            allSem.push(semId - 2); allSem.push(semId - 1);
        } else {
            allSem.push(semId - 1); allSem.push(semId + 1);
        }

        let totalScore = await UserScore.findAll({
            raw: true,
            where: {
                UserId: userId,
                SemesterId: {
                    [Op.in]: allSem
                }
            },
            include: [Score, Subject],
            attributes: ['Subject.Credit', 'Subject.Code', 'Score.total4']
        });
        // console.log(totalScore);
        let total4 = 0.0;
        let cres = 0;
        for (let c of totalScore) {
            if (c.Code.startsWith("PES")) continue;
            total4 += c.total4 * c.Credit;
            cres += c.Credit;
        }

        for (let c of listOfSubjects) {
            if (c.code.startsWith("PES")) continue;
            // console.log(c);
            cres += c.credits;
            total4 += changeMark(c.score.final) * c.credits;
        }
        // console.log(total10 / cres);
        if (cres == 0) return 0;
        return (total4 / cres);


    } catch(err) {
        throw err;
    }
}

/** Get temporary GPA */
export const getTempGPA = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let semId = req.body.id;
        let subjects = req.body.subjects;
        let credits = 0;
        for (let c of subjects) {
            credits += c.credits;
        }
        let semesterGPA = calGPA(subjects);
        let totalGPA = await calTempAllGPA(subjects, user.Id, semId);
        let yearGPA = await calTempYearGPA(subjects, user.Id, semId);
        let result = {};
        result.sumOfCredits = credits;
        result.totalGPA = totalGPA;
        result.yearGPA = yearGPA;
        result.semesterGPA = semesterGPA;
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function getUserGPAById(id) {
    try {
        let totalScore = await UserScore.findAll({
            raw: true,
            where: {
                UserId: id
            },
            include: [Score, Subject],
            attributes: ['Subject.Code','Subject.Credit', 'Score.total10', 'Score.total4']
        });
        let total10 = 0.0, total4 = 0.0;
        let cres = 0;
        let tmp = 0;
        for (let c of totalScore) {
            if (c.Code.startsWith("PES")) {tmp++; continue;}
            total10 += c.total10 * c.Credit;
            total4 += c.total4 * c.Credit;
            cres += c.Credit;
        }
        if (cres == 0) {
            return {credits: 0 + tmp, gpa10: 0, gpa4: 0};
        }
        else return {credits: cres + tmp, gpa10: (total10/cres), gpa4: (total4/cres)};
    } catch (err) {
        throw err;
    }
}

/** Get averange GPA of this student */
export const getUserGPA = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let result = await getUserGPAById(user.Id);
        delete(result.credits);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err.message);
    }
}
