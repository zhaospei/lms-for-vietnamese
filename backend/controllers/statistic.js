import { getUserGPAById } from "./score.js";
import User from "../models/user.js"
import Subject from "../models/subject.js";
import UserScore from "../models/userScore.js";
import Semester from "../models/semester.js";
import Score from "../models/score.js";
import { semesterInfoById } from "./score.js";
import { Op } from "sequelize";


const keyMark = ['F', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+'];
const keyRangeMark = ["3.6 ~ 4.0", "3.2 ~ 3.59", "2.5 ~ 3.19", "2.0 ~ 2.49", "< 2.0"]
function getTypeMark(mark) {
    if (mark < 4.0) return 0;
    if (mark < 5.0) return 1;
    if (mark < 5.5) return 2;
    if (mark < 6.5) return 3;
    if (mark < 7.0) return 4;
    if (mark < 8.0) return 5;
    if (mark < 8.5) return 6;
    if (mark < 9.0) return 7;
    return 8;
}

function getRangeMark(gpa4) {
    if (gpa4 < 2.0) return 4;
    if (gpa4 < 2.5) return 3;
    if (gpa4 < 3.2) return 2;
    if (gpa4 < 3.6) return 1;
    return 0;
}

/** GPA */

async function calAverageGpa(listOfStudents) {
    try {
        let ans;
        let gpa10 = 0.0, gpa4 = 0.0, num = 0;
        let range = [0, 0, 0, 0, 0];
        let result = [];
        for (let student of listOfStudents) {
            try {
                let cur = await getUserGPAById(student.Id);
                if (cur.credits == 0) {
                    continue;
                }  else {
                    num++;
                    gpa10 += cur.gpa10;
                    gpa4 += cur.gpa4;
                    let tmp = getRangeMark(gpa4);
                    range[tmp]++;
                }
            } catch (err) {
                throw err;
            }
            
        }
        // console.log("a");
        if (num == 0) ans = {students: 0, gpa10: 0, gpa4: 0};
        else {
            ans = {students: num, gpa10: (gpa10/num), gpa4: (gpa4/num)};
        }
        for (let i = 0; i < 5; i++) {
            let tmp = {'type': keyRangeMark[i], 'value': range[i]};
            result.push(tmp);
        }
        ans['result'] = result;
        return ans;
    } catch (err) {
        throw err;
    }
}

export const getAverageGpaOfAll = async (req, res) => {
    try {   
        let students = await User.findAll({
            raw: true
        });
        let ans = await calAverageGpa(students);
        res.status(200).json(ans);
    
    } catch (err) {
        res.status(500).json(err);
    }

}


export const getAverageGpaBySubject = async(req, res) => {
    try {
        let subjectId = req.query.subjectId;  
        console.log(subjectId);
        let scores = await UserScore.findAll({
            raw: true,
            where: {
                SubjectId: subjectId
            },
            include: [Score],
            attributes: ['Score.total10', 'Score.total4']
        });
        console.log(scores);
        let ans;
        let gpa10 = 0, gpa4 = 0, num = 0;
        let numtotal = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let score of scores) {
            num++;
            gpa10 += score.total10;
            gpa4 += score.total4;
            let cur = getTypeMark(gpa10);
            numtotal[cur]++;
        }
        
        if (num == 0) ans = {students: 0, gpa10: 0, gpa4: 0};
        else {
            ans = {students: num, gpa10: (gpa10/num), gpa4: (gpa4/num)};
        }
        for (let i = 0; i < 9; i++) {
            ans[keyMark[i]] = numtotal[i];
        }
        
        res.status(200).json(ans);
    
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getAverageGpaBySchoolYear = async(req, res) => {
    try {   
        let schoolYear = req.query.schoolYear;
        let students = await User.findAll({
            raw: true,
            where: {
                StudentId: {
                    [Op.like]: `${schoolYear}%`
                }
            }
        });
        // console.log("33", students.length);
        let ans = await calAverageGpa(students);
        res.status(200).json(ans);
        // res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err);
    }
}

/** Credits */

async function calAverageCredit(listOfStudents, semId = null) {
    try {
        let credits = 0;
        let num = listOfStudents.length;
        
        for (let student of listOfStudents) {
            let whereCondition = {};
            if (semId === null) {
                whereCondition = {
                    UserId: student.Id
                }
            } else {
                whereCondition = {
                    UserId: student.Id,
                    SemesterId: semId,
                }
            }
            let totalCre = await UserScore.findAll({
                raw: true,
                where: whereCondition,
                include: [Subject],
                attributes: ['Subject.Credit']
            });
            if (totalCre.length == 0) {
                num--;
            }
            // console.log(totalCre);
            for (let c of totalCre) {
                credits += c.Credit;
            }
        }
        if (num == 0) return {students: 0, credits: 0};
        return {students: num, credits: (credits / num)};
    } catch (err) {
        throw err;
    }
    
}

export const getAverageCreditBySchoolYear = async(req, res) => {
    try {   
        let {params} = req;
        let students = await User.findAll({
            raw: true,
            where: {
                StudentId: {
                    [Op.like]: `${params.startId}%`
                }
            }
        });
        // console.log("33", students);
        let ans = await calAverageCredit(students);
        res.status(200).json(ans);
        // res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getCreditRangeInSemester = async(req, res) => {
    try {   
        // let {params} = req;
        let semId = req.query.semesterId;
        let sem = await Semester.findOne({
            raw: true,
            where: {
                Id: semId
            }
        });
        if (sem === null) {
            res.status(404).json("semester not found");
            return;
        }

        let schoolYear = req.query.year;

        // console.log(semId, schoolYear);
        let students = await User.findAll({
            raw: true,
            where: {
                StudentId: {
                    [Op.like]: `${schoolYear}%`
                },
            }
        });

    
        // console.log(students.length);
        let t10 = 0, t15 = 0, t20 = 0, t25 = 0, t30 = 0; 
        for (let student of students) {
            // console.log(student);
            let totalCre = await UserScore.findAll({
                raw: true,
                where: {
                    UserId: student.Id,
                    SemesterId: semId,
                },
                include: [Subject],
                attributes: ['Subject.Credit']
            });
            // console.log(totalCre.length);
            let cur = 0;
            for (let c of totalCre) {
                cur += c.Credit;
            }
            // console.log(cur);
            if (cur <= 10) t10++;
            else if (cur <= 15) t15++;
            else if (cur <= 20) t20++;
            else if (cur <= 25) t25++;
            else t30++; 
        }
        // console.log(t10, t15, t20, t25, t30);
        let result = [];
        result.push({type: "0-10", value: t10});
        result.push({type: "10-15", value: t15});
        result.push({type: "15-20", value: t20});
        result.push({type: "20-25", value: t25});
        result.push({type: "25-30", value: t30});
        let ans = {};
        ans.semester = sem.Name;
        ans.result = result;
        res.status(200).json(ans);
        // res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getCreditAndGPAInAllSemesters = async(req, res) => {
    try {
        const user = res.locals.decodedUser;
        let sems = await Semester.findAll({
            raw: true,
        });
        let ans = [];
       

        for (let c of sems) {
            let result = {};
            result.title = c.Name;
            let semInfo = await semesterInfoById(user.Id, c.Id);
            if (! semInfo) {
                continue;
            } else {
                result.credits = semInfo.sumOfCredits;

                result.totalGPA10 = semInfo.semesterGPA;
                result.totalGPA4 = semInfo.semesterGPA4;
                
                if (semInfo.subjects.length > 0) {
                    ans.push(result);
                }
            }
        }
        res.status(200).json(ans);
    } catch (err) {
        res.status(500).json(err.message);
    }

}



