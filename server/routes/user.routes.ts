import express from 'express';
import {
  activateUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from '../controller/user.controller';
import { authorizeRoles, isAuthenticate } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticate, logoutUser);
userRouter.get('/refresh', updateAccessToken);
userRouter.get('/me', isAuthenticate, getUser);
userRouter.post('/social-auth', socialAuth);
userRouter.put('/update-user-info', isAuthenticate, updateUserInfo);
userRouter.put('/update-user-password', isAuthenticate, updatePassword);
userRouter.put('/update-user-avatar', isAuthenticate, updateProfilePicture);
userRouter.get(
  '/get-users',
  isAuthenticate,
  authorizeRoles('admin'),
  getAllUsers
);

export default userRouter;
