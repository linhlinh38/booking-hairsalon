import { IStylist } from '../interfaces/stylist.interface';
import { stylistService } from '../services/stylist.service';
import { NextFunction, Request, Response } from 'express';
import { RoleEnum, ServiceStatusEnum, UserStatusEnum } from '../utils/enums';
import { branchService } from '../services/branch.service';
import { serviceSalonService } from '../services/service.service';
import { IService } from '../interfaces/service.interface';

async function getBranchService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const service = await serviceSalonService.getAll();
    return res
      .status(200)
      .json({ message: 'Get service Successfully', data: service });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, type, duration, price, images, description } = req.body;
  const servicetDTO: IService = {
    name,
    type,
    duration,
    price,
    images,
    status: ServiceStatusEnum.INUSE,
    description
  };

  try {
    await serviceSalonService.create(servicetDTO);
    return res.status(201).json({
      message: 'Create service Successfully'
    });
  } catch (error) {
    next(error);
  }
}

export const serviceController = {
  create,
  getBranchService
};
