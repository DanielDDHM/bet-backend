import e from 'express';
import { AuthController } from '../controllers';

const router = e.Router();

router.get('/login', new AuthController().login)
router.get('/logout', new AuthController().logout)

export default router
