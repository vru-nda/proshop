import express from 'express';
const router = express.Router();

import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserByID,
} from '../controllers/userController.js';
import {isAdmin, protect} from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .put(protect, isAdmin, updateUser)
  .get(protect, isAdmin, getUserByID);

export default router;
