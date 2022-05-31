import e from 'express';
import { BetsController } from '../controllers';

const router = e.Router();

router.get('/get', new BetsController().get)
router.post('/create', new BetsController().create)

export default router
