import express from 'express'
import {getMajorById, createMajor} from "../controllers/major.js";
const router = express.Router();


router.get('/majorById', getMajorById);
router.post('/createMajor', createMajor);
export default router;