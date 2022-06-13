import e from 'express';
import { BetsController } from '../controllers';
import {
  CheckRoleMiddleware,
  CheckTokenMiddleware
} from '../middleware';

const router = e.Router();

router.get('/get',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new BetsController().get)

router.post('/create',
  new CheckTokenMiddleware().verifyToken,
  new BetsController().create)

export default router
