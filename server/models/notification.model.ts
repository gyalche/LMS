import mongoose from 'mongoose';

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}
const notificationModle = new mongoose.Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'unread',
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model('notification', notificationModle);

export default NotificationModel;
