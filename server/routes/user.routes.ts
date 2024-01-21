import express from 'express';
import {
  activateUser,
  loginUser,
  logoutUser,
  registrationUser,
} from '../controller/user.controller';
import { isAuthenticate } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticate, logoutUser);
export default userRouter;
