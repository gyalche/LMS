import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { catchAsyncError } from './catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import { redis } from '../utils/redis';

export const isAuthenticate = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.cookies.access_token;
      if (!access_token) {
        return next(new ErrorHandler('user in not authenticated', 400));
      }
      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;

      if (!decoded) {
        return next(new ErrorHandler('Access token is not valid', 404));
      }
      const user = await redis.get(decoded.id);
      if (!user) {
        return next(new ErrorHandler('user not found', 404));
      }
      req.user = JSON.parse(user);
      next();
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);

//authorize  role;
export const authorizeRoles = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || '')) {
      next(
        new ErrorHandler(
          `Role ${req.user?.role} is not allow to access this  resource`,
          404
        )
      );
    }
    next();
  };
};
