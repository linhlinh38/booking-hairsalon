import { IBooking } from './booking.interface';
import { IManager } from './manager.interface';
import { IUser } from './user.interface';

export interface IFeedback {
  _id?: string;
  star: number;
  images?: Express.Multer.File[] | string[];
  feedback: string;
  branch?: string | IManager;
  booking?: string | IBooking;
  customer?: string | IUser;
  createdAt?: string;
}
