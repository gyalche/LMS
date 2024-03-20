import express from 'express';
import {
  getCoursesAnaltics,
  getOrdersAnaltics,
  getUsersAnaltics,
} from '../controller/analytics.controller';
import { authorizeRoles, isAuthenticate } from '../middleware/auth';

const analyticsRoute = express.Router();

analyticsRoute.get(
  '/get-users-analytics',
  isAuthenticate,
  authorizeRoles('admin'),
  getUsersAnaltics
);
analyticsRoute.get(
  '/get-courses-analytics',
  isAuthenticate,
  authorizeRoles('admin'),
  getCoursesAnaltics
);
analyticsRoute.get(
  '/get-orders-analytics',
  isAuthenticate,
  authorizeRoles('admin'),
  getOrdersAnaltics
);
export default analyticsRoute;
