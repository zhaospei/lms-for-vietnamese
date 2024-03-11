import express from 'express'
import {
    likeByPage,
    getLikeByPage,
    getCommentByPage,
    getCommentCountByPage,
} from '../controllers/page.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router
    .route('/api/page/comment/:pageType/:pageId/:offset/:limit')
    .get(auth, getCommentByPage)

router
    .route('/api/page/comment-count/:pageType/:pageId')
    .get(auth, getCommentCountByPage)

router
    .route('/api/page/like/')
    .post(auth, likeByPage)
router
    .route('/api/page/like/:pageType/:pageId')
    .get(auth, getLikeByPage)

export default router;