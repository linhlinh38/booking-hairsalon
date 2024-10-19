import express from 'express';
import authentication from '../middlewares/authentication';
import { serviceController } from '../controllers/service.controller';

const serviceRouter = express.Router();
serviceRouter.get('/branch-service', serviceController.getBranchService);
serviceRouter.use(authentication);
serviceRouter.post('/', serviceController.create);
export default serviceRouter;
