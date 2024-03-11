import Notification from "../models/notification.js";
import User from "../models/user.js";
import UserHandleDTO from '../dto/userHandle.js'
export async function createNoti(userId, content, link = null, senderId) {
    try {
        console.log(userId, content, link, senderId);
        let newNoti = await Notification.create({
            Content: content,
            UserId: userId,
            Link: link,
            SenderId: senderId
        });
        await newNoti.save();
    } catch (err) {
        throw err;
    }
}

// createNoti(13, "Test Notification", "xyz");

export const getNotification = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        let notiList = await Notification.findAll({
            raw: true,
            where: {
                UserId: user.Id
            }
        });
        let ans = [];

        if (notiList === null) res.status(200).json(ans);
        else {
            // console.log(notiList.length);
            for (let c of notiList) {
                let sender = await User.findOne({
                    raw: true,
                    where: {
                        Id: c.SenderId
                    }
                });
                c.author = await UserHandleDTO.convertToDto(sender);
                // console.log(c.author);
                delete c.UserId;
                ans.push(c);
            }
            ans.reverse();
            res.status(200).json(ans);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const seenNotification = async (req, res) => {
    try {
        const user = res.locals.decodedUser;
        if (req.body.seenType === 'single') {
            const notiId = req.body.notiId;
            let noti = await Notification.findOne({
                where: {
                    UserId: user.Id,
                    Id: notiId
                }
            });
            if (noti === null) {
                res.status(404).json("Notification not found");
                return;
            }
            await noti.update({
                Seen: true
            });
            await noti.save();
            res.status(200).json("Seen successfully");
        } else if (req.body.seenType === 'all') {
            try {
                await Notification.update(
                    { Seen: true },
                    { where: { UserId: user.Id, Seen: false } }
                  );
            } catch (error) {
                res.status(500).json(error)
            }
        } else {

            res.status(400).json('seenType is invalid')
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
