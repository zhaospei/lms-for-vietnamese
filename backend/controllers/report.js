import Report from "../models/report.js";
import PageReport from "../models/pageReport.js";
import ReportDTO from "../dto/report.js";
import User from "../models/user.js";


export const createReport = async (req, res) => {
    // try {
        const { content, pageType, pageId, type} = req.body;
        const decodedUser = res.locals.decodedUser
        const report = await Report.create({
            Content: content,
            UserId: decodedUser.Id,
            Type: type,
        });

        await report.save();
        // console.log(report)

        const pageReport = await PageReport.create({
            ReportId: report.Id,
            PageType: pageType,
            PageId: pageId,
        });

        await pageReport.save();

        res.status(201).send({
            message: 'Report successfully created',
            ReportId: report.Id,
        })
    // } catch (err) {
    //     res.status(500).json(err.message);
    // }
};

export const getReportId = async (req, res) => {
    try {
        const { reportId } = req.body;
        const decodedUser = res.locals.decodedUser
        const report = await Report.findOne({
            where: {
                Id: reportId
            }
        });
        const reportDTO = await ReportDTO.convertToDto(report);
        res.status(200).send(reportDTO);
    } catch (error) {
        res.status(500).send(error)
    }
    
}

export const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.body
        const loggedInUser = res.locals.decodedUser
        const report = await Report.findOne({
            where: {
                Id: reportId
            }
        })

        if (!report) {
            res.status(404).send({ error: 'Report not found' })
            return
        } 

        const user = await User.findOne({
            where: {
                Id: loggedInUser.Id
            }
        })

        if (user.Role != 1) {
            res.status(401).send({ error: 'You not own of this report' })
            return
        }

        const deleteReport = await Report.destroy({
            where: {
                Id: reportId
            }
        })

        if (deleteReport !== 0) {
            res.status(200).send({ message: 'The report has been deleted.' })
        } else {
            res.status(500).send({ error: 'Failed to destroy the report.' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


export const modifyReport = async (req, res) => {
    try {
        const { reportId, status} = req.body
        const loggedInUser = res.locals.decodedUser
        const report = await Report.findOne({
            where: {
                Id: reportId
            }
        })

        if (!report) { 
            res.status(404).send({ error: 'Report not found' })
            return
        }

        const user = await User.findOne({
            where: {
                Id: loggedInUser.Id
            }
        })
        
        if (user.Role != 1) {
            res.status(401).send({ error: 'You can not modify this report!'})
            return
        }
        report.Status = status;

        await report.save();
        res.status(201).send({ message: 'Report successfully modified' })
    } catch (error) {
        res.status(500).send(error)
    }
}