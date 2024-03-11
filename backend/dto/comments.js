import User from "../models/user.js"
import Comment from "../models/comment.js"
import PageComment from "../models/pageComment.js"
import UserHandleDTO from './userHandle.js'
import UserLike from "../models/userLike.js"

/**
 * A data-transfer-object representing the information of a comment
 */
export default class CommentDTO {
  static async convertToDto(comment, userId = 0) {
    const author = await UserHandleDTO.convertToDto(
      await User.findByPk(comment.UserId)
    )
    const children = await Comment.findAll({
      attributes: ['Id'],
      where: { ParentId: comment.Id },
    })
    const usersLiked = await UserLike.findAll({
      where: { PageId: comment.Id , PageType: 'C', score: 1},
      raw: true,
    })
    const usersDisLiked = await UserLike.findAll({
      where: { PageId: comment.Id , PageType: 'C', score: -1},
      raw: true,
    })

    const pageComment = await PageComment.findOne({
      where: {CommentId: comment.Id},
      raw: true,
    })

    return {
      Id: comment.Id,
      pageId: pageComment.PageId,
      pageType: pageComment.PageType,
      content: comment.Content,
      author,
      parent: comment.ParentId,
      preVersion: comment.PreCommentId,
      children: children.map((child) => child.Id),
      usersLiked: usersLiked.length,
      usersDisLiked: usersDisLiked.length,
      timestamp: Date.parse(comment.CreatedAt),
      hasLiked: usersLiked.some((like) => like.UserId === userId),
      hasDisLiked: usersDisLiked.some((like) => like.UserId === userId),
    }
  }
}