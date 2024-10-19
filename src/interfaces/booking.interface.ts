import { IBranch } from './branch.interface';
import { ICourt } from './court.interface';
import { IUser } from './user.interface';

export interface IBooking {
  _id?: string;
  type: string;
  paymentType: string;
  paymentMethod: string;
  totalPrice: number;
  totalHour: number;
  startDate: string;
  endDate: string;
  status: string;
  court?: string | ICourt;
  branch: string | IBranch;
  imageQR?: Express.Multer.File | string;
  customer?: string | IUser;
  createdAt?: string;
}
