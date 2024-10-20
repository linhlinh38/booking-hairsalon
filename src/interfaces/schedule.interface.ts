import { IBooking } from './booking.interface';
import { ICourt } from './court.interface';
import { IService } from './service.interface';
import { IStylist } from './stylist.interface';

export interface ISchedule {
  _id?: string;
  type: string;
  slots: string[];
  startTime: string;
  endTime: string;
  date: string;
  booking?: string | IBooking;
  court?: any;
  stylist: string | IStylist;
  services?: string[] | IService[];
  status: string;
}
