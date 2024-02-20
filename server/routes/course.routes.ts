import express from 'express';
import {
  editCourse,
  getAllCourse,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from '../controller/course.controller';
import { authorizeRoles, isAuthenticate } from '../middleware/auth';
const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  isAuthenticate,
  authorizeRoles('admin'),
  uploadCourse
);
courseRouter.put(
  '/edit-course',
  isAuthenticate,
  authorizeRoles('admin'),
  editCourse
);
courseRouter.get('/get-course/:id', getSingleCourse);
courseRouter.get('/get-courses', getAllCourse);
courseRouter.get('/get-course-content/:id', isAuthenticate, getCourseByUser);

export default courseRouter;
