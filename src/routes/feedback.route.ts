import express from 'express';
import authentication from '../middlewares/authentication';
import feedbackController from '../controllers/feedback.controller';
import { Author } from '../middlewares/authorization';
import { RoleEnum } from '../utils/enums';

const feedbackRouter = express.Router();
feedbackRouter.get(
  '/get-of-branch/:branch',
  feedbackController.getBranchFeedback
);
feedbackRouter.get('/get-by-id/:id', feedbackController.getFeedbackById);

feedbackRouter.use(authentication);
feedbackRouter.post(
  '/',
  Author([RoleEnum.CUSTOMER]),
  feedbackController.createFeedback
);

export default feedbackRouter;
