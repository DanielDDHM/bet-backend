import e from 'express';
import { BetsController } from '../controllers';

const router = e.Router();

// USERS

// BETS
router.delete('/bets/delete/:id', new BetsController().delete)

//GAME

//ADDRESS
export default router
