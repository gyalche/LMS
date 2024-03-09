import { Response } from 'express';
import userModel from '../models/user.model';

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
