import e from 'express';
import { UsersController } from '../controllers';

const router = e.Router();
router.get('/')
router.post('/create', new UsersController().create);
router.put('/')
router.patch('/')
router.delete('/')

export default router
