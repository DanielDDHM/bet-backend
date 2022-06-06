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

router.put('/confirmAccount/:id?',
  new CheckTokenMiddleware().verifyToken,
  new UsersController().update)

//TODO: rota pra recuperar senha

export default router
