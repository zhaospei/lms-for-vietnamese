import express from 'express'
import { getSemesterInfoById,  getUserGPA, getTempGPA,
    getAllSemesterInfo, updateSemesterCourseList } from '../controllers/score.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/score/getSemesterInfoById/:semesterId').get(auth, getSemesterInfoById);
router.route('/api/score/getAllSemesterInfo').get(auth, getAllSemesterInfo);
// router.route('/api/score/createCourseScoreInSemester').post(auth, createCourseScoreInSemester);
// router.route('/api/score/deleteCourseScoreInSemesterById/:userScoreId').delete(auth, deleteCourseScoreInSemesterById);
// router.route('/api/score/updateCourseScoreInSemesterById/:userScoreId').put(auth, updateCourseScoreInSemesterById)
router.route('/api/score/getUserGPA').get(auth, getUserGPA);
router.route('/api/score/updateSemesterCourseList').post(auth, updateSemesterCourseList);
router.route('/api/score/getTempGPA').post(auth, getTempGPA);
export default router;