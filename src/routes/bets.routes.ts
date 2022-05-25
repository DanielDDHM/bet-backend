import e from 'express';
import { betsController } from '../controllers';

const router = e.Router();

router.get('/')
router.post('/create', betsController.create);
router.put('/')
router.patch('/')
router.delete('/')

export default router
