import { Response } from 'express';
import userModel from '../models/user.model';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';

//get user by id;
export const getUserById = async (id: any, res: Response) => {
  const user = userModel.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
};

//get all users;
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });
  res.status(2001).json({
    success: true,
    users,
  });
};

export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  try {
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return new ErrorHandler(error.message, 404);
  }
};
