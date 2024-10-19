import { IBranch } from './branch.interface';
import { IService } from './service.interface';

export interface IStylist {
  username: string;
  email: string;
  password: string;
  gender: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  description: string;
  branch: string | IBranch;
  services: IService[];
  role: string;
  dob: Date;
  status: string;
}
