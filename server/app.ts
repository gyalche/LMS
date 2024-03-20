import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/error';
import userRouter from './routes/user.routes';
import courseRouter from './routes/course.routes';
import orderRouter from './routes/order.routes';
import analyticsRoute from './routes/analytics.routes';
dotenv.config();

//body parser;
app.use(express.json({ limit: '50mb' }));

//cookie parser;
app.use(cookieParser());

//cors=>cross origin resource sharing;
app.use(cors({ origin: process.env.ORIGIN }));

//Routes;
app.use('/api/v1', userRouter);
app.use('/api/v1', courseRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', analyticsRoute);
//unknown routes;
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);
