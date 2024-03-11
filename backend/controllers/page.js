import Comment from "../models/comment.js";
import PageComment from "../models/pageComment.js";
import CommentDTO from "../dto/comments.js";
import UserLike from "../models/userLike.js";
import Document from "../models/document.js";
import Page from "../models/page.js";
import { createNoti } from "./notification.js";
import Subject from "../models/subject.js";

export const getCommentByPage = async (req, res) => {
    try {
        const { pageId , pageType, offset, limit} = req.params
        // if (pageType === 'S') {
        //     const subject = await Subject.findOne({
        //         where: {
        //             Id: pageId
        //         }
        //     });
        // }
        // const { offset, limit} = req.query;
        const decodedUser = res.locals.decodedUser
        const comments = await PageComment.findAll({
            include: [
              {
                model: Comment,
                required: true,
              }  
            ],
            where: {
                PageId: pageId,
                pageType: pageType,
                parentId: 0,
            },
            order: [
                [Comment, 'CreatedAt', 'DESC']
            ],
            offset: parseInt(offset),
            limit: parseInt(limit),
        });

        const commentDTOs = await Promise.all(comments.map( async (comment) => {
            // console.log(comment)
            const commentModel = await Comment.findByPk(comment.CommentId)
            const commentDTO = await CommentDTO.convertToDto(commentModel, decodedUser.Id);
            return commentDTO;
        }));

        // commentDTOs.sort((a, b) => {
        //     return b.timestamp - a.timestamp;
        // });

        // console.log(commentDTOs)
        res.status(200).send(commentDTOs);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getCommentCountByPage = async (req, res) => {
    try {
        const { pageId , pageType } = req.params
        const comments = await PageComment.count({
            where: {
                PageId: pageId,
                pageType: pageType,
                parentId: 0,
            },
        });

        // console.log(commentDTOs)
        res.status(200).send({
            count: comments,
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

export const likeByPage = async (req, res) => {
    try {
        const { pageId , pageType , score} = req.body;
        // console.log(pageId , pageType , score)
        const decodedUser = res.locals.decodedUser
        const userLike = await UserLike.findOne({
            where: {
                PageId: pageId,
                PageType: pageType,
                UserId: decodedUser.Id,
            },
        });

        if (!userLike && score !== 0) {
            const newUserLike = await UserLike.create({
                PageId: pageId,
                PageType: pageType,
                UserId: decodedUser.Id,
                Score: score,
            });
            await newUserLike.save();
            if (pageType === 'D') {
                let document = await Document.findOne({
                    raw: true,
                    where: {
                        Id: pageId
                    }
                });
                let page = await Page.findOne({
                    raw: true, 
                    where: {
                        PageId: pageId
                    }
                })
                let name = decodedUser.Name; 
                if (document.UserId !== decodedUser.Id) await createNoti(document.UserId, `${name} đã thích tài liệu ${document.Name} của bạn`, "/all-subjects/documents/details?documentId="+document.Id, decodedUser.Id);
            } else if (pageType === 'C') {
                let comment = await Comment.findOne({
                    raw: true,
                    where: {
                        Id: pageId
                    }
                });
                let page = await Page.findOne({
                    raw: true, 
                    where: {
                        PageId: pageId
                    }
                });
                let pageCom = await PageComment.findOne({
                    raw: true,
                    where: {
                        CommentId: comment.Id
                    }
                });


                let name = decodedUser.Name; 
                let content = comment.Content.substring(0, 20);
                if (comment.UserId !== decodedUser.UserId) {
                    if (pageCom.PageType === 'D') {
                        await createNoti(comment.UserId, `${name} đã thích bình luận "${content}" của bạn`, "/all-subjects/documents/details?documentId="+ pageCom.PageId,  decodedUser.Id);
                    } else {
                        await createNoti(comment.UserId, `${name} đã thích bình luận "${content}" của bạn`, "/all-subjects/details?subjectId="+ pageCom.PageId,  decodedUser.Id);
                    }
                }
                
            }
        } else {
            userLike.Score = score;
            await userLike.save();
        }

        res.status(200).send({
            message: "Successfully like!",
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getPageLikes(pageId, pageType) {
    try {
        const likes = await UserLike.count({
            where: {
                PageId: pageId,
                PageType: pageType,
                Score: 1,
            },
        });
        return likes;
    } catch (err) {
        throw err;
    }
}

export async function getPageDislikes(pageId, pageType) {
    try {
        const dislikes = await UserLike.count({
            where: {
                PageId: pageId,
                PageType: pageType,
                Score: -1,
            },
        });
        return dislikes;
    } catch (err) {
        throw err;
    }
}

export async function getUserlikes(pageId, pageType, userId) {
    try {
        const userLike = await UserLike.findOne({
            where: {
                PageId: pageId,
                PageType: pageType,
                UserId: userId
            },
        });
        return userLike;
    } catch (err) {
        throw err;
    }
}


export const getLikeByPage = async (req, res) => {
    try {
        const { pageId , pageType } = req.params;
        const decodedUser = res.locals.decodedUser
        const likes = await getPageLikes(pageId, pageType);

        const dislikes = await getPageDislikes(pageId, pageType);
        const userLike = await getUserlikes(pageId, pageType, decodedUser.Id);

        if (!userLike) {
            res.status(201).send({
                likes: likes,
                dislikes: dislikes,
                userLike: 0,
            });
            return
        }

        res.status(201).send({
            likes: likes,
            dislikes: dislikes,
            userLike: userLike.Score,
        });
    } catch (error) {
        res.status(500).send(error)
    }
}