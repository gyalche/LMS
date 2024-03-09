import { Response, Request, NextFunction } from 'express';
import NotificationModel from '../models/notification.model';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import cron from 'node-cron';
//get all notification --only admin
export const getNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update notification status;

export const updateNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findByIdAndUpdate(
        req.params.id,
        {
          status: 'read',
        }
      );

      if (!notification) {
        return next(new ErrorHandler('Error', 400));
      }
      await notification.save();
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//delete notification --only admin using cron;

cron.schedule('0 0 0 * * *', async () => {
  const thrityDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({
    status: 'read',
    createdAt: { $lt: thrityDaysAgo },
  });
});
