import express from 'express'
import {
    createReport,
    getReportId,
    deleteReport,
    modifyReport,
} from '../controllers/report.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router
  .route('/api/report/')
  .get(auth, getReportId)
  .post(auth, createReport)
  .put(auth, modifyReport)
  .delete(auth, deleteReport)

export default router;