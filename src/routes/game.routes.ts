import e from 'express';
import { AuthController, GamesController } from '../controllers';

const router = e.Router();

router.get('/get/:id?',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new GamesController().get)
router.post('/create',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new GamesController().create)
router.put('/update/:id?',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new GamesController().update)

export default router
