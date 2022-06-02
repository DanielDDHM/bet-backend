import e from 'express';
import { AuthController, UsersController } from '../controllers';

const router = e.Router();
router.get('/get/:id?', new UsersController().get)
router.post('/create', new UsersController().create)
router.put('/update/:id?', new UsersController().update)

export default router
