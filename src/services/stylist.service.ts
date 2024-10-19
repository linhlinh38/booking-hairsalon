import { BadRequestError } from '../errors/badRequestError';
import { EmailAlreadyExistError } from '../errors/emailAlreadyExistError';
import { NotFoundError } from '../errors/notFound';
import { ISchedule } from '../interfaces/schedule.interface';
import { IStylist } from '../interfaces/stylist.interface';
import scheduleModel from '../models/schedule.model';
import stylistModel from '../models/stylist.model';
import { BranchStatusEnum } from '../utils/enums';
import { encryptedPassword } from '../utils/jwt';
import { BaseService } from './base.service';
import { branchService } from './branch.service';
import { userService } from './user.service';

class StylistService extends BaseService<IStylist> {
  constructor() {
    super(stylistModel);
  }

  async getBranchStylist(branchId: string) {
    const stylists = await stylistModel
      .find({ branch: branchId })
      .populate('branch services');
    if (!stylists) throw new BadRequestError('stylists null');
    return stylists;
  }

  async getStylistForBooking(
    branchId: string,
    serviceId: string,
    slots: string[],
    date: Date
  ) {
    const stylistBooked = await scheduleModel.find({
      slots: { $in: slots },
      date: date
    });

    let stylist: string[] = [];
    stylistBooked.map((item: ISchedule) => {
      return stylist.push(item.stylist.toString());
    });
    const stylists = await stylistModel
      .find({
        _id: { $nin: [...stylist] },
        branch: branchId,
        services: { $elemMatch: { _id: serviceId } }
      })
      .populate('branch services');
    if (!stylists) throw new BadRequestError('stylists null');
    return stylists;
  }

  async createStylist(stylistDTO: IStylist) {
    const emailUserExist = await userService.search({
      email: stylistDTO.email
    });
    if (emailUserExist.length > 0) throw new EmailAlreadyExistError();

    const branch = await branchService.getById(stylistDTO.branch as string);
    if (!branch) throw new NotFoundError('Branch not found');

    if (branch.status != BranchStatusEnum.ACTIVE)
      throw new BadRequestError('Can only add stylist to active branch');

    stylistDTO.password = await encryptedPassword(stylistDTO.password);
    const savedSylist = await this.model.create(stylistDTO);
    return savedSylist;
  }
}

export const stylistService = new StylistService();
