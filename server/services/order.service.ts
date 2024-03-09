import { NextFunction } from 'express';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import OrderModel from '../models/order.mode';
import { nextTick } from 'process';

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

//get all aorder;

export const getAllOrdersServices = catchAsyncError(
  async (res: Response, next: NextFunction) => {
    try {
      const order = await OrderModel.find().sort({ createdAt: -1 });
      res?.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);
