/**
 * A data-transfer-object representing the information of a User Handle
 */
export default class UserHandleDTO {
    static async convertToDto(user) {
        return {
            userId: user.Id,
            studentId: user.StudentId,
            name: user.Name,
            avatar: user.Avatar ? user.Avatar : null,
        }
    }
}