import express from 'express'
import {
  getUserHandles,
  registerUser,
  modifyUser,
  deleteUser, 
  getUsersByStudentId, 
  authenticateUser,
  changePassword,
  activateAccount,
  resetPassword,
  forgotPassword,
  changeAvatar,
  changeBio,
  getScore,
  changeScore,
  changeLearn,
  getLearn,
  changeBook,
  getBook
} from '../controllers/user.js'
import { auth } from '../middlewares/auth.js'
import { superAuth } from '../middlewares/superauth.js'
import { avatarUpload } from '../middlewares/cloud.js';
const router = express.Router()

router
  .route('/api/users')
  .get(auth, getUserHandles)
  .post(registerUser)
  .put(auth, modifyUser)
  .delete(auth, deleteUser)

router.route('/api/users/activate/:token').get(activateAccount)
router.route('/api/users/forgot-password/').post(forgotPassword)
router.route('/api/users/reset/:token').post(resetPassword)
router.route('/api/users/auth').post(authenticateUser)
router.route('/api/users/:studentid').get(auth, getUsersByStudentId)
router.route('/api/users/change-password/').post(auth, changePassword)
router.post('/api/users/changeAvatar', auth, avatarUpload.single('up'), changeAvatar);
router.route('/api/users/changeBio').post(auth, changeBio);
router.route('/api/users/changeBook').post(auth, changeBook);
router.route('/api/users/book/getBook').get(auth, getBook);
router.route('/api/users/changeScore').post(auth, changeScore);
router.route('/api/users/score/getScore').get(auth, getScore);
router.route('/api/users/changeLearn').post(auth, changeLearn);
router.route('/api/users/learn/getLearn').get(auth, getLearn);

export default router;