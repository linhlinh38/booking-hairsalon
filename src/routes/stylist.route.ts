import express from 'express';
import authentication from '../middlewares/authentication';
import { serviceController } from '../controllers/service.controller';
import { stylistController } from '../controllers/stylist.controller';

const stylistRouter = express.Router();
stylistRouter.use(authentication);
stylistRouter.post('/', stylistController.create);
stylistRouter.get(
  '/get-by-branch/:branchId',
  stylistController.getBranchStylist
);
stylistRouter.post(
  '/get-stylist-available',
  stylistController.getStylistForBooking
);
export default stylistRouter;
