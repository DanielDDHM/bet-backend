import e from 'express';
import {
  InternalBetsController,
  InternalGameController,
  InternalUsersController
} from '../controllers';
import {
  CheckRoleMiddleware,
  CheckTokenMiddleware
} from '../middleware';
const router = e.Router();

// USERS
router.patch('/users/activate/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new InternalUsersController().update)

router.delete('/users/delete/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new InternalUsersController().delete)

// BETS

router.delete('/bets/delete/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new InternalBetsController().delete)

//GAME
router.patch('/game/activate/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new InternalGameController().update)

router.delete('/game/delete/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new InternalGameController().delete)

export default router
