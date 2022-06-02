import e from 'express';
import {
  BetsController,
  UsersController,
  GamesController,
  AddressController
} from '../controllers';

const router = e.Router();

// USERS
router.patch('/users/patch/:id')
router.delete('/users/delete/:id')

// BETS
router.delete('/bets/delete/:id', new BetsController().delete)

//GAME
router.patch('/game/patch/:id')
router.delete('/game/delete/:id')

//ADDRESS
router.delete('/game/delete/:id')

export default router
