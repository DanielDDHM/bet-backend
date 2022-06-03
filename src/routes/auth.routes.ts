import e from 'express';
import { AuthController } from '../controllers';

const router = e.Router();

router.post('/login', new AuthController().login)
router.post('/logout', new AuthController().logout)

export default router
