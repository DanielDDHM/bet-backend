import e from 'express';
import { GamesController } from '../controllers';

const router = e.Router();

router.get('/get/:id?', new GamesController().get)
router.post('/create', new GamesController().create)
router.put('/')
router.patch('/')
router.delete('/')

export default router