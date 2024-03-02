import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('orderModel', orderSchema);

export default OrderModel;
