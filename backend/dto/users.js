/**
 * A data-transfer-object representing the information of a User
 */
export default class UserDTO {
  static async convertToDto(user) {
    return {
      id: user.Id,
      name: user.Name,
      studentId: user.StudentId,
      date: user.Birth,
      bio: user.Bio,
      avatar: user.Avatar ? user.Avatar : null,
      book: user.Book,
    }
  }
}