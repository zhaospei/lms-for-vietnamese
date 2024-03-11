import express from 'express'
import {
    registerUser,
    getUserHandles,
    getUsersByStudentId,
    modifyUser,
    deleteUser,
} from '../controllers/admin.js'
import { superAuth } from '../middlewares/superauth.js'
const router = express.Router();

router
  .route('/api/admin/users')
  .get(superAuth, getUserHandles)
  .post(superAuth, registerUser)
  .put(superAuth, modifyUser)
  .delete(superAuth, deleteUser)

router
  .route('/api/admin/users/:studentid').get(superAuth, getUsersByStudentId)


export default router;