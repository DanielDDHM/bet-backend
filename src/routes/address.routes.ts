import e from 'express';
import { AddressController, AuthController } from '../controllers';

const router = e.Router();

router.get('/get', new AuthController().verifyLogin, new AddressController().get)
router.post('/create', new AuthController().verifyLogin, new AddressController().create)

export default router
