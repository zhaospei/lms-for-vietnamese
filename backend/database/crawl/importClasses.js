import fs from 'fs';
import Subject from "../../models/subject.js";
import Class from '../../models/class.js';
import { Op } from "sequelize";

const regex = /(\d+)-(\d+)/;
const dataObject = {};
const filePath = "./database/result/class.json";

function readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
}

async function getSubjectId(subjectCode) {
    try {
        const subject = await Subject.findOne({
            where: {
                Code: {
                    [Op.like]: `%${subjectCode}%`
                }
            }
        }) 
        return subject.dataValues.Id;
    } catch (err) {
        console.log("Error: ", err.message);
    } 
}

function trimClass(str) {
    let tmp = str.replace(" (CLC)", "");
    let words = tmp.split(" ");
    if (words.length == 2) return tmp;
    let res = tmp.replace(/\s+/, "");
    return res;
}

async function importClasses(sz) {
    for (let i = 0; i < sz; i++) {
        try {
            let cur = dataObject.data[i];
            let id = await getSubjectId(cur.SubjectCode);
            let string = cur.Lesson;
            let match = string.match(regex);
            let startL = parseInt(match[1]);
            let endL = parseInt(match[2]);
            let weekDay = cur.Weekday;
            if (weekDay == "CN") weekDay = "8";
            let classCode = trimClass(cur.ClassCode)

            //console.log(cur);
            const newClass = await Class.create({
                Name: cur.Name,
                Code: classCode,
                lessonStart: startL,
                lessonEnd: endL,
                Location: cur.Location,
                Teacher: cur.Teacher,
                weekDay: parseInt(weekDay),
                number: parseInt(cur.NumberStudent),
                group: cur.Group,
                SubjectId: id,
            });
            await newClass.save();
        } catch (importErr) {
            console.log("Import Error: ", importErr);
        }
    }
}

async function main() {
    try {
        const data = await readFile();
        const jsonData = JSON.parse(data);
        dataObject.data = jsonData;

        //console.log(jsonData.length);
        importClasses(jsonData.length);
        //let subjectId = await getSubjectId(dataObject.data[0].SubjectCode);
        //console.log("sid: ", subjectId);
        // let tmp = "7-13";
        // let match = tmp.match(regex);
        // console.log(parseInt(match[1]), parseInt(match[2]));
    } catch (error) {
        console.log('Error:', error);
    }
}

// main();