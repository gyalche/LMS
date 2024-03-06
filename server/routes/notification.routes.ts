import express from 'express';
import {
  getNotification,
  updateNotification,
} from '../controller/notification.controller';
import { authorizeRoles, isAuthenticate } from '../middleware/auth';

const notificationRoute = express.Router();

notificationRoute.get(
  '/ge-all-notification',
  isAuthenticate,
  authorizeRoles('admin'),
  getNotification
);
notificationRoute.put(
  '/update-notification/:id',
  isAuthenticate,
  authorizeRoles('admin'),
  updateNotification
);
export default notificationRoute;
