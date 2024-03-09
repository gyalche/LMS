import { NextFunction, Response, Request } from 'express';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import OrderModel, { IOrder } from '../models/order.mode';
import userModel from '../models/user.model';
import courseModel from '../models/course.model';
import path from 'path';
import ejs from 'ejs';
import { sendMail } from '../utils/sendMail';
import NotificationModel from '../models/notification.model';
import { getAllOrdersServices, newOrder } from '../services/order.service';
import moment from 'moment';
import { updateUserRoleService } from '../services/user.service';
export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const user = await userModel.findById(req.user?._id);
      const courseExistInUser = user?.courses?.some((course: any) =>
        course._id.toString.equals(courseId)
      );
      if (courseExistInUser) {
        return next(
          new ErrorHandler('you have already purchased this course', 404)
        );
      }
      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler('course not found', 404));
      }
      const data: any = {
        courseId: course._id,
        userId: user?._id,
      };
      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: moment(new Date()).format('Do MMM YYYY'),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, '../mails/order-confirmation.ejs'),
        { order: mailData }
      );
      try {
        if (user) {
          await sendMail({
            email: user?.email,
            subject: 'order confirmation',
            template: 'order-confirmation.ejs',
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 404));
      }

      user?.courses?.push(course?._id);

      await user?.save();

      //notification;
      const notification = new NotificationModel({
        user: user?._id,
        title: 'New order',
        message: `You have a new order from ${course.name}`,
      });
      notification.save();
      course.purchased ? (course.purchased += 1) : course.purchased;
      await course.save();
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

//get all order;

export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(res, id, role);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
