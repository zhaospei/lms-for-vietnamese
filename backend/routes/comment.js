import express from 'express'
import {
    createComment,
    getCommentId,
    modifyComment,
    deleteComment,
    getChildrenComment,
    getVersionByComment,
} from '../controllers/comment.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router
  .route('/api/comment/')
  .post(auth, createComment)
  .put(auth, modifyComment)
  .delete(auth, deleteComment)

router
  .route('/api/comment/getchildren/:commentid')
  .get(auth, getChildrenComment)
router.route('/api/comment/:commentid').get(auth, getCommentId)

router
    .route('/api/comment/get-versions/')
    .get(auth, getVersionByComment)

export default router;