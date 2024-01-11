import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/error';
import userRouter from './routes/user.routes';
dotenv.config();

//body parser;
app.use(express.json({ limit: '50mb' }));

//cookie parser;
app.use(cookieParser());

//cors=>cross origin resource sharing;
app.use(cors({ origin: process.env.ORIGIN }));

//Routes;
app.use('/api/v1', userRouter);

//unknown routes;
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);
