import e from 'express';
import {
  BetsController,
  UsersController,
  GamesController
} from '../controllers';
import {
  CheckRoleMiddleware,
  CheckTokenMiddleware
} from '../middleware';
const router = e.Router();

// USERS
router.patch('/users/patch/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new UsersController().update)

router.delete('/users/delete/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new UsersController().delete)

// BETS
router.delete('/bets/delete/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new BetsController().delete)

//GAME
router.patch('/game/patch/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new GamesController().update)

router.delete('/game/delete/:id',
  new CheckTokenMiddleware().verifyToken,
  new CheckRoleMiddleware().checkRole,
  new GamesController().delete)

export default router
