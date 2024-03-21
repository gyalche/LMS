import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import layoutModel from '../models/layout.model';
import cloudinary from 'cloudinary';

//create layout;
export const createLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      if (type === 'Banner') {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: 'layout',
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await layoutModel.create(banner);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
