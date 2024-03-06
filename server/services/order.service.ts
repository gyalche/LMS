import { NextFunction } from 'express';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import OrderModel from '../models/order.mode';

export const newOrder = catchAsyncError(
  async (data: any, next: NextFunction, res: Response) => {
    try {
      const order = await OrderModel.create(data);
      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
