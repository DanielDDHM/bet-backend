import e from 'express';
import { AuthController, GamesController } from '../controllers';

const router = e.Router();

router.get('/get/:id?',
  new AuthController().verifyLogin,
  new GamesController().get)
router.post('/create',
  new AuthController().verifyLogin,
  new GamesController().create)
router.put('/update/:id?',
  new AuthController().verifyLogin,
  new GamesController().update)
router.patch('/')

export default router
