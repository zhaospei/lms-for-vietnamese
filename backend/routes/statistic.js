import express from 'express'
import { getAverageGpaOfAll, getAverageGpaBySubject, getAverageGpaBySchoolYear,
    getAverageCreditBySchoolYear, getCreditRangeInSemester, getCreditAndGPAInAllSemesters } from '../controllers/statistic.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/statistic/getAverageGpaOfAll').get(auth, getAverageGpaOfAll);
router.route('/api/statistic/getAverageGpaBySubject').get(auth, getAverageGpaBySubject);
router.route('/api/statistic/getAverageGpaBySchoolYear').get(auth, getAverageGpaBySchoolYear);
router.route('/api/statistic/getCreditAndGPAInAllSemesters').get(auth, getCreditAndGPAInAllSemesters);
router.route('/api/statistic/getAverageCreditBySchoolYear/:startId').get(auth, getAverageCreditBySchoolYear);
router.route('/api/statistic/getCreditRangeInSemester').get(auth, getCreditRangeInSemester);
export default router;