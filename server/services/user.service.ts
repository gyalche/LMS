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
