import express from 'express';
import authentication from '../middlewares/authentication';
import { serviceController } from '../controllers/service.controller';

const serviceRouter = express.Router();
serviceRouter.use(authentication);
serviceRouter.post('/', serviceController.create);
serviceRouter.get('/branch-service', serviceController.getBranchService);
export default serviceRouter;
