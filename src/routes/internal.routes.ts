import e from 'express';
import {
  BetsController,
  UsersController,
  GamesController,
  AuthController
} from '../controllers';

const router = e.Router();

// USERS
router.patch('/users/patch/:id',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new UsersController().update)

router.delete('/users/delete/:id',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new UsersController().delete)

// BETS
router.delete('/bets/delete/:id',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new BetsController().delete)

//GAME
router.patch('/game/patch/:id',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new GamesController().update)

router.delete('/game/delete/:id',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new GamesController().delete)

export default router
