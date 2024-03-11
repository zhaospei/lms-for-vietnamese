import express from 'express'
import {getScheduleInWeek, getSubjectInWeek} from '../controllers/schedule.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/schedule/getScheduleInWeek').get(auth, getScheduleInWeek);
router.route('/api/schedule/getSubjectInWeek').get(auth, getSubjectInWeek);

export default router;