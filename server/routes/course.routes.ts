import express from 'express';
import {
  addAnswer,
  addQuestion,
  addReview,
  editCourse,
  getAllCourse,
  getAllCourses,
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
courseRouter.put('/add-question', isAuthenticate, addQuestion);
courseRouter.put('/add-answer', isAuthenticate, addAnswer);
courseRouter.put('/add-review/:id', isAuthenticate, addReview);
courseRouter.put(
  '/add-reply/:id',
  isAuthenticate,
  authorizeRoles('admin'),
  addReview
);
courseRouter.get(
  '/add-courses',
  isAuthenticate,
  authorizeRoles('admin'),
  getAllCourses
);

export default courseRouter;
