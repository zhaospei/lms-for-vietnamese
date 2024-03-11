import express from 'express'
import { createEvent, deleteEventById, updateEventById } from '../controllers/event.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.route('/api/event/createEvent').post(auth, createEvent);
router.route('/api/event/deleteEventById/:id').delete(auth, deleteEventById);
router.route('/api/event/updateEventById/:id').put(auth, updateEventById);
export default router;