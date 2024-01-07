import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const emailRegexExpression: RegExp = /A[A-Z0-9+_.-]+@[A-Z0-9.-]+Z/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'please enter a email'],
      validate: {
        validator: (value: string) => {
          return emailRegexExpression.test(value);
        },
        message: 'Enter a valid email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: [6, 'Password must be atleast 6 character'],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [{ courseId: String }],
  },
  { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  enteredpassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredpassword, this.password);
};

const userModel: Model<IUser> = mongoose.model('User', userSchema);
export default userModel;
