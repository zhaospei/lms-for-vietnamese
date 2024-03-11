import User from "../models/user.js"
import Report from "../models/report.js"
import PageReport from "../models/pageReport.js"
import UserHandleDTO from './userHandle.js'

/**
 * A data-transfer-object representing the information of a comment
 */
export default class ReportDTO {
  static async convertToDto(report) {
    const author = await UserHandleDTO.convertToDto(
      await User.findByPk(report.UserId)
    )

    const pageReport = await PageReport.findOne({
      where: {ReportId: report.Id},
      raw: true,
    })

    return {
      Id: report.Id,
      pageId: pageReport.PageId,
      pageType: pageReport.PageType,
      content: report.Content,
      author,
      timestamp: Date.parse(report.CreatedAt),
    }
  }
}