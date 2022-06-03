import e from 'express';
import { AuthController, BetsController } from '../controllers';

const router = e.Router();

router.get('/get', new AuthController().verifyLogin, new BetsController().get)
router.post('/create', new AuthController().verifyLogin, new BetsController().create)

export default router
