import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import { generateLastTwelveMonthsData } from '../utils/analytics.generator';
import userModel from '../models/user.model';
import courseModel from '../models/course.model';
import OrderModel from '../models/order.mode';

//--only for admin;
export const getUsersAnaltics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await generateLastTwelveMonthsData(userModel);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get courses analytics --only for admin;
export const getCoursesAnaltics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLastTwelveMonthsData(courseModel);
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
//get order analytics --only for admin;
export const getOrdersAnaltics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ordres = await generateLastTwelveMonthsData(OrderModel);
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
