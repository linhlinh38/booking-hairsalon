import { IStylist } from '../interfaces/stylist.interface';
import { stylistService } from '../services/stylist.service';
import { NextFunction, Request, Response } from 'express';
import { RoleEnum, UserStatusEnum } from '../utils/enums';

async function getStylistForBooking(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { branchId, serviceId, slots, date } = req.body;
    const stylist = await stylistService.getStylistForBooking(
      branchId,
      serviceId,
      slots,
      date
    );
    return res
      .status(200)
      .json({ message: 'Get stylist Successfully', data: stylist });
  } catch (error) {
    next(error);
  }
}

async function getBranchStylist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const branchId = req.params.branchId;
    const stylist = await stylistService.getBranchStylist(branchId);
    return res
      .status(200)
      .json({ message: 'Get stylist Successfully', data: stylist });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  const {
    username,
    email,
    password,
    gender,
    firstName,
    lastName,
    phone,
    image,
    description,
    dob,
    branch,
    services
  } = req.body;
  const stylistDTO: IStylist = {
    username: username ?? '',
    email,
    password,
    gender: gender ?? '',
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    phone: phone ?? '',
    dob: dob ?? '',
    status: UserStatusEnum.ACTIVE,
    role: RoleEnum.STYLIST,
    branch,
    services,
    image,
    description
  };

  try {
    await stylistService.createStylist(stylistDTO);
    return res.status(201).json({
      message: 'Create stylist Successfully'
    });
  } catch (error) {
    next(error);
  }
}

export const stylistController = {
  create,
  getBranchStylist,
  getStylistForBooking
};
