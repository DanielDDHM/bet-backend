import e from 'express';
import { AddressController } from '../controllers';
import {
  CheckRoleMiddleware,
  CheckTokenMiddleware
} from '../middleware';

const router = e.Router();

router.get('/get',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new AddressController().get)

router.post('/create',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new AddressController().create)

export default router
