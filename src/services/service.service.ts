import { BadRequestError } from '../errors/badRequestError';
import { IService } from '../interfaces/service.interface';
import serviceModel from '../models/service.model';
import { BaseService } from './base.service';

class ServiceSalonService extends BaseService<IService> {
  constructor() {
    super(serviceModel);
  }

  async getBranchService(branchId: string) {
    const services = await serviceModel
      .find({ branch: branchId })
      .populate('branch');
    if (!services) throw new BadRequestError('services null');
    return services;
  }
}

export const serviceSalonService = new ServiceSalonService();
