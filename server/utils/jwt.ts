require('dotenv').config();
import { Response } from 'express';
import { IUser } from '../models/user.model';
import { redis } from './redis';

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken;
  const refreshToken = user.SignRefreshToken;

  //upload session to redis;

  const accessTokenExpires = parseInt(
    process.env.ACCESS_TOKEN_EXPIRES || '300',
    10
  );

  const refreshTokenExpires = parseInt(
    process.env.REFRESH_TOKEN_EXPIRES || '1200',
    10
  );
};
