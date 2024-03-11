import express from 'express'
import { getNotification, seenNotification } from '../controllers/notification.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();



router.route('/api/notification/getNotification').get(auth, getNotification);
router.route('/api/notification/seenNotification').post(auth, seenNotification);
export default router;