import Schedule from "../models/Schedule.js";
import Class from "../models/class.js";
import Event from "../models/event.js";
import EventClass from "../models/eventClass.js";
import sequelize from "../database/db.js";
import Subject from "../models/subject.js";
import { Op } from "sequelize";
import { getCoursebyStudentId } from "../middlewares/crawlCourse.js";
import { START_CUR_TERM_DAY, END_CUR_TERM_DAY, CUR_TERM_ID } from "../constant.js";
import {getRandColor} from '../utils/getRandColor.js'
import {getDate} from '../utils/date.js'

export const getScheduleInWeek = async (req, res) => {
    try {
        const today = new Date();
        const firstDayOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay()),
        );

        const lastDayOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay() + 7),
        );
        // console.log('First day of the week:', firstDayOfWeek);
        // console.log('Last day of the week:', lastDayOfWeek);

        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id
            }
        });
        let scheId = sche.Id;
        const eventList = await Event.findAll({
            raw: true,
            where: {
                ScheduleId: scheId,
                [Op.or]: [
                    {
                        day: {
                            [Op.between]: [firstDayOfWeek, lastDayOfWeek]
                        }

                    },
                    {
                        day: null
                    }
                ]
            },
            include: {
                model: Class,
                include: {
                    model: Subject,
                }
            },
            attributes: [
                'id', 'name', 'timeStart', 'timeEnd', 'day', 'location', 'info', 'color',
                [sequelize.col('Classes.Code'), 'classCode'],
                [sequelize.col('Classes.Teacher'), 'teacher'],
                [sequelize.col('Classes.number'), 'number'],
                [sequelize.col('Classes.group'), 'group'],
                [sequelize.col('Classes.weekday'), 'weekday'],
                [sequelize.col('Classes.lessonStart'), 'lessonStart'],
                [sequelize.col('Classes.lessonEnd'), 'lessonEnd'],
                [sequelize.col('Classes.Subject.Credit'), 'credit'],
            ]
        });
        //console.log(eventList);
        //res.status(200).json(eventList);
        let result = [];
        for (let c of eventList) {
            let tmp = {};
            tmp.eventId = c.id;
            tmp.name = c.name;
            console.log(c.timeStart);
            // let cur_start = `${c.day}T${c.timeStart}`;
            tmp.timeStart = getDate(c.timeStart, c.day);
            tmp.timeStart.setHours(tmp.timeStart.getHours() - 7);
            // let cur_end = `${c.day}T${c.timeEnd}`;
            tmp.timeEnd = getDate(c.timeEnd, c.day);
            tmp.timeEnd.setHours(tmp.timeEnd.getHours() - 7);
            tmp.color = c.color;
            tmp.location = c.location;
            tmp.info = c.info;
            result.push(tmp);
        }
        // const eventListRes = eventList.map(({id, name, timeStart, timeEnd, day, location, info, color,
        //     classCode, teacher, number, group, weekday, lessonStart, lessonEnd, creadit}) => ({ id, name,
        //     timeStart, timeEnd, day, location, info, color, classCode, teacher, number, group,
        //     weekday, lessonStart, lessonEnd, creadit }));

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getSubjectInWeek = async (req, res) => {
    try {
        const today = new Date();
        const firstDayOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay()),
        );

        const lastDayOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay() + 7),
        );
        // console.log('First day of the week:', firstDayOfWeek);
        // console.log('Last day of the week:', lastDayOfWeek);

        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id
            }
        });
        let scheId = sche.Id;
        const eventList = await Event.findAll({
            raw: true,
            where: {
                ScheduleId: scheId,
                [Op.or]: [
                    {
                        day: {
                            [Op.between]: [firstDayOfWeek, lastDayOfWeek]
                        }

                    },
                    {
                        day: null
                    }
                ]
            },
            include: {
                model: Class,
                include: {
                    model: Subject,
                }
            },
            attributes: [
                'id','name', 'timeStart', 'timeEnd', 'day', 'location', 'info', 'color',
                // [sequelize.col('Classes.Code'), 'classCode'],

                [sequelize.col('Classes.Subject.Id'), 'subId'],
                [sequelize.col('Classes.Teacher'), 'teacher'],
                [sequelize.col('Classes.number'), 'number'],
                [sequelize.col('Classes.group'), 'group'],
                [sequelize.col('Classes.weekday'), 'weekday'],
                [sequelize.col('Classes.lessonStart'), 'lessonStart'],
                [sequelize.col('Classes.lessonEnd'), 'lessonEnd'],
                [sequelize.col('Classes.Subject.Credit'), 'credits'],
                [sequelize.col('Classes.Subject.Code'), 'code']
            ]
        });
        //console.log(eventList);
        //res.status(200).json(eventList);
        let result = [];
        if (eventList === null) {
            res.status(200).json(result);
            return;
        }
        for (let c of eventList) {
            if (c.id === null || c.subId === null)
                continue;
            let tmp = {};
            tmp.id = c.subId;
            tmp.eventId = c.id;
            tmp.code = c.code;
            tmp.lessonStart = c.lessonStart;
            tmp.lessonEnd = c.lessonEnd;
            tmp.group = c.group;
            tmp.name = c.name;
            tmp.place = c.location;
            tmp.credits = c.credits;
            tmp.teacherName = c.teacher;
            tmp.weekDay = c.weekday;
            tmp.numberOfStudents = c.number;
            tmp.highlightColor = c.color;
            tmp.description = c.info;

            result.push(tmp);
        }
        // const eventListRes = eventList.map(({id, code, name, timeStart, timeEnd, day, location, info, color,
        //      teacher, number, group, weekday, lessonStart, lessonEnd, credits}) => ({ id, code, name,
        //     timeStart, timeEnd, day, location, info, color,  teacher, number, group,
        //     weekday, lessonStart, lessonEnd, credits }));

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

function trimClass(str) {
    let tmp = str.replace(" (CLC)", "");
    let words = tmp.split(" ");
    if (words.length == 2) return tmp;
    let res = tmp.replace(/\s+/, "");
    return res;
}

function getDays(start, end, weekDay) {
    let currentDate = new Date(start), cur = new Date(start);
    let res = [];

    while (currentDate <= end) {
      if (currentDate.getDay() === weekDay) {
        cur = currentDate;
        break;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    while (cur <= end) {
        let tmp = new Date(cur);
        res.push(tmp);
        cur.setDate(cur.getDate() + 7);
    }
    return res;
}

function lessonToTime(lesson) {
    let cur = lesson + 6;
    let str = cur + "";
    if (cur < 10) {
        str = "0" + cur;
    }
    return str + ":00:00";
}

export async function autoCreateEventClass(user) {
    try {
        
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id,
            }
        });
        const classList = await getCoursebyStudentId(user.StudentId, CUR_TERM_ID);
        let classInfo = [];
        for (let i = 0; i < classList.length; i++) {
            let classCode = trimClass(classList[i].class);
            const cur = await Class.findAll({
                raw: true,
                where: {
                    Code: classCode,
                    [Op.or]: [
                        {
                            group: "CL"

                        },
                        {
                            group: classList[i].group
                        }
                    ]
                }
            })
            for (let j = 0; j < cur.length; j++) {
                classInfo.push(cur[j]);
            }
        }
        for (let cla of classInfo) {
            let wD = (cla.weekDay - 1) % 7;
            let days = getDays(new Date(START_CUR_TERM_DAY), new Date(END_CUR_TERM_DAY), wD);
            for (let dayy of days) {
                const newEvent = await Event.create({
                    Name: cla.Name,
                    TimeStart: lessonToTime(cla.lessonStart),
                    TimeEnd: lessonToTime(cla.lessonEnd + 1),
                    Location: cla.Location,
                    Info: cla.Teacher,
                    day: dayy,
                    ScheduleId: sche.Id,
                    color: getRandColor()
                });
                await newEvent.save();
                let newEventId = newEvent.Id;
                const newClassEvent = await EventClass.create({
                    EventId: newEventId,
                    ClassId: cla.Id
                });
                await newClassEvent.save();

            }
        }
        return ("created successfully");
    } catch (err) {
        throw err;
    }
}
