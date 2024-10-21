import { NextFunction, Request, Response } from 'express';
import { IFeedback } from '../interfaces/feedback.interface';
import { AuthRequest } from '../middlewares/authentication';
import { feedbackService } from '../services/feedback.service';

async function createFeedback(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const newFeedback: IFeedback = {
    star: req.body.star ?? 0,
    feedback: req.body.feedback,
    images: req.body.images,
    customer: req.loginUser,
    booking: req.body.booking,
    branch: req.body.branch
  };
  try {
    await feedbackService.createFeedback(newFeedback);
    return res.status(201).json({ message: 'Created Feedback Successfully' });
  } catch (error) {
    next(error);
  }
}

async function getBranchFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const feedBacks = await feedbackService.getBranchFeedback(
      req.params.branch
    );
    return res
      .status(200)
      .json({ message: 'Get Feedback Successfully', data: feedBacks });
  } catch (error) {
    next(error);
  }
}

async function getBookingFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const feedBacks = await feedbackService.search({
      booking: req.params.booking
    });
    return res
      .status(200)
      .json({ message: 'Get Feedback Successfully', data: feedBacks });
  } catch (error) {
    next(error);
  }
}

async function getFeedbackById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const feedback = await feedbackService.getById(req.params.id);
    return res
      .status(200)
      .json({ message: 'Get Feedback Successfully', data: feedback });
  } catch (error) {
    next(error);
  }
}

export default {
  createFeedback,
  getBranchFeedback,
  getFeedbackById,
  getBookingFeedback
};
