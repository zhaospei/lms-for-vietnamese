import express from 'express'
import { createSanPham, createDocument, getDocumentById, getDocumentOfSubject,
    getMyDocumentByStudentId, dumpUpload } from "../controllers/document.js";
import { docUpload } from '../middlewares/cloud.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.post('/api/document/createSanPham', auth, docUpload.single('up'), createSanPham);
router.post('/api/document/createDocument', auth ,createDocument);
router.route('/api/document/getDocumentById').get(auth, getDocumentById);
router.route('/api/document/getDocumentOfSubject').get(auth, getDocumentOfSubject);
router.route('/api/document/getMyDocumentByStudentId').get(auth, getMyDocumentByStudentId);
router.route('/api/document/dumpUpload').post(dumpUpload)
export default router;
