import express from 'express';
import {
  activateUser,
  getUser,
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
} from '../controller/user.controller';
import { isAuthenticate } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticate, logoutUser);
userRouter.get('/refresh', updateAccessToken);
userRouter.get('/me', isAuthenticate, getUser);

export default userRouter;
