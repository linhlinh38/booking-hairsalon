import moment from 'moment';
import { BadRequestError } from '../errors/badRequestError';
import { IFeedback } from '../interfaces/feedback.interface';
import feedbackModel from '../models/feedback.model';
import { BaseService } from './base.service';
import { bookingService } from './booking.service';
import { BookingStatusEnum } from '../utils/enums';
import { ObjectId } from 'mongoose';

class FeedbackService extends BaseService<IFeedback> {
  constructor() {
    super(feedbackModel);
  }

  async getBranchFeedback(branchId: string) {
    const feedback = await feedbackModel
      .find({ branch: branchId })
      .populate('branch customer booking');
    if (!feedback) throw new BadRequestError('Feedback null');
    return feedback;
  }

  async createFeedback(feedBack: IFeedback) {
    const feedBackExist = await feedbackModel.find({
      customer: feedBack.customer,
      booking: feedBack.booking
    });
    if (feedBackExist.length > 0)
      throw new BadRequestError('Feedback already exists');

    const booking = await bookingService.getById(feedBack.booking as string);
    if (!booking || booking.status !== BookingStatusEnum.DONE)
      throw new BadRequestError('Booking invalid');

    const today = moment();
    const endDate = moment(booking.endDate);
    const deadline = endDate.clone().add(10, 'days');
    if (today.isAfter(deadline)) {
      throw new BadRequestError(
        'Cannot create feedback after booking completed 10 days'
      );
    }

    const savedFeedback = await this.model.create(feedBack);
    return savedFeedback;
  }
}

export const feedbackService = new FeedbackService();
