/**
 * A data-transfer-object representing the information of a version of a comment
 */
export default class CommentVersionDTO {
    static async convertToDto(comment) {
        return {
            commentId: comment.CommentId,
            createAt: comment.CreatedAt,
            userId: comment.UserId,
            content: comment.Content,
        }
    }
}