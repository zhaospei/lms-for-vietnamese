import Event from "../models/event.js";
import Schedule from "../models/Schedule.js";
import {hhmmss, yyyymmdd} from '../utils/date.js'


export const createEvent = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id
            }
        });
        let start = new Date(req.body.timeStart);
        let end = new Date(req.body.timeEnd);
        start.setHours(start.getHours() + 7);
        end.setHours(end.getHours() + 7);
        let stime = hhmmss(start);
        let etime = hhmmss(end);
        let day = yyyymmdd(start);
        // console.log(end.substring(11, 19));

        const newEvent = await Event.create({
            Name: req.body.name,
            TimeStart: stime,
            TimeEnd: etime,
            Location: req.body.location,
            Info: req.body.info,
            day: day,
            color: req.body.color,
            ScheduleId: sche.Id,
        });
        await newEvent.save();
        let ans = {};
        ans.msg = "Created successfully";
        ans.eventId = newEvent.Id;
        res.status(200).json(ans);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const deleteEventById = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id,
            }
        });
        let {params} = req;
        let curEvent = await Event.findOne({
            where: {Id: params.id}
        });
        if (! curEvent) {
            res.status(404).json("Not found");
        }
        else if (curEvent.ScheduleId != sche.Id) {
            res.status(403).json("Do not have permission!")
        } else{
            await curEvent.destroy();
            res.status(200).json("Delete successfully")
        }


    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const updateEventById = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        const sche = await Schedule.findOne({
            where: {
                UserId: user.Id,
            }
        });
        let {params} = req;
        let curEvent = await Event.findOne({
            where: {Id: params.id}
        });
        if (! curEvent) {
            res.status(404).json("Not found");
        }
        else if (curEvent.ScheduleId != sche.Id) {
            res.status(403).json("Do not have permission!")
        } else{
            let etime, stime, day;
            let start = req.body.timeStart ? new Date(req.body.timeStart) : null;
            let end = req.body.timeEnd ? new Date(req.body.timeEnd) : null;
            if (start !== null) {day = yyyymmdd(start); stime = hhmmss(start);}
            if (end !== null) etime = hhmmss(end);

            curEvent.set({
                Name: (! req.body.name) ? curEvent.Name : req.body.name,
                TimeStart: (! stime) ? curEvent.TimeStart : stime,
                TimeEnd:(! etime) ? curEvent.TimeEnd : etime,
                Location: (! req.body.location) ? curEvent.Location : req.body.location,
                Info: (! req.body.info) ? curEvent.Info : req.body.info,
                day: (! day) ? curEvent.day : day,
                color: (! req.body.color) ? curEvent.color : req.body.color,
            });
            await curEvent.save();
            res.status(200).json("Update successfully")
        }


    } catch (err) {
        res.status(500).json(err.message);
    }
}
