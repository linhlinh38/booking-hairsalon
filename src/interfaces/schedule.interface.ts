import { IBooking } from './booking.interface';
import { ICourt } from './court.interface';
import { IStylist } from './stylist.interface';

export interface ISchedule {
  _id?: string;
  type: string;
  slots: string[];
  startTime: string;
  endTime: string;
  date: string;
  booking?: string | IBooking;
  court: string | ICourt;
  stylist: string | IStylist;
  status: string;
}
