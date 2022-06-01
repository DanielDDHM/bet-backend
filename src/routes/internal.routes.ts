import e from 'express';
import { BetsController } from '../controllers';

const router = e.Router();

// USERS
router.patch('/')
router.delete('/')

// BETS
router.delete('/bets/delete/:id', new BetsController().delete)

//GAME
router.patch('/')
router.delete('/')

//ADDRESS
export default router
