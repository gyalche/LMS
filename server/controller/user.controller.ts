import { catchAsyncError } from './../middleware/catchAsyncError';
import { Request, Response, NextFunction } from 'express';
import userModel, { IUser } from '../models/user.model';
import ErrorHandler from '../utils/errorHandler';
import { catchAsyncError } from '../middleware/catchAsyncError';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import { sendMail } from '../utils/sendMail';
dotenv.config();

//register user;
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, avatar } = req.body;
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler('Email already exists', 4000));
      }
      const user: IRegistrationBody = {
        name,
        email,
        password,
        avatar,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, '../mail/activation-mail.ejs'),
        data
      );
      try {
        await sendMail({
          email: user.email,
          subject: 'Avtivate your email',
          template: 'activation-mail.ejs',
          data,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.name}`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return new ErrorHandler(error.message, 400);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}
export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: '5m' }
  );
  return { token, activationCode };
};

//activate user;
interface IActivationUser {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } = req.body as IActivationUser;
      const newUser: { user: IUser; activationCode: any } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      );
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler('Invalid action  code', 404));
      }
      const { email, name, password } = newUser.user;
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler('user already exists', 400));
      }
      const user = await userModel.create({ email, name, password });
      res.status(201).json({ success: true });
    } catch (error) {}
  }
);

//login user;
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        next(new ErrorHandler('Invalid credentials', 404));
      }

      const user = await userModel.findOne({ email }).select('+password');
      if (!user) {
        next(new ErrorHandler('user doesnt exist', 404));
      }
      const isPasswordMatch = await user?.comparePassword(password);
      if (!isPasswordMatch) {
        next(new ErrorHandler('password doesnt match', 404));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);
