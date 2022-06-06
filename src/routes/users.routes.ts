import e from 'express';
import { AuthController, UsersController } from '../controllers';

const router = e.Router();
router.post('/create', new UsersController().create)
router.get('/get/:id?',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new UsersController().get)
router.put('/update/:id?',
  new AuthController().verifyLogin,
  new AuthController().checkRole,
  new UsersController().update)

export default router
