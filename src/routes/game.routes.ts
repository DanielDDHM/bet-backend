import e from 'express';
import { GamesController } from '../controllers';
import {
  CheckRoleMiddleware,
  CheckTokenMiddleware
} from '../middleware';

const router = e.Router();

router.get('/get/:id?',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new GamesController().get)

router.post('/create',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new GamesController().create)

router.put('/update/:id?',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new GamesController().update)

export default router
