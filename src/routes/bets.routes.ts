import e from 'express';
import { BetsController } from '../controllers';

const router = e.Router();

router.get('/')
router.post('/', new BetsController().create)
router.put('/')
router.patch('/')
router.delete('/')

export default router
