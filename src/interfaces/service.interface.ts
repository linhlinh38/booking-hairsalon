import { IBranch } from './branch.interface';

export interface IService {
  _id?: string;
  name: string;
  type: string;
  duration: number;
  price: number;
  images?: Express.Multer.File[] | string[];
  description: string;
  status: string;
  branch?: string | IBranch;
}
