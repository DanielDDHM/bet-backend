import e from 'express';
import { UsersController } from '../controllers';
import {
  CheckRoleMiddleware,
  CheckTokenMiddleware
} from '../middleware';

const router = e.Router();

router.post('/create',
  new UsersController().create)

router.get('/get/:id?',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new UsersController().get)

router.put('/update/:id?',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new UsersController().update)

router.patch('/confirmAccount/:id?',
  new CheckTokenMiddleware().verifyToken,
  new UsersController().update)

router.post('/recoverPassword/:id?',
  new CheckTokenMiddleware().verifyToken)

export default router
