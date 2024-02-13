import express from 'express';
import { uploadCourse } from '../controller/course.controller';
import { authorizeRoles, isAuthenticate } from '../middleware/auth';
const courseRouter = express.Router();

courseRouter.post('/create-course', isAuthenticate,authorizeRoles("admin") uploadCourse);
