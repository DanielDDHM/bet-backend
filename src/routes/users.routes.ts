import e from 'express';
import { usersController } from '../controllers';

const router = e.Router();

router.get('/')
router.post('/create', usersController.create);
router.put('/')
router.patch('/')
router.delete('/')

export default router
