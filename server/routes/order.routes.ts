import express from 'express';
import { authorizeRoles, isAuthenticate } from '../middleware/auth';
import { createOrder, getAllOrders } from '../controller/order.controller';

const orderRouter = express.Router();

orderRouter.post('/create-order', isAuthenticate, createOrder);
orderRouter.get(
  '/get-orders',
  isAuthenticate,
  authorizeRoles('admin'),
  getAllOrders
);

export default orderRouter;
