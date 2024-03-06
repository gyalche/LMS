import express from 'express';
import { isAuthenticate } from '../middleware/auth';
import { createOrder } from '../controller/order.controller';

const orderRouter = express.Router();

orderRouter.post('/create-order', isAuthenticate, createOrder);
export default orderRouter;
