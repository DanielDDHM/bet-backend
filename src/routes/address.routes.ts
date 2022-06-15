import e from 'express';
import { AddressController } from '../controllers';

const router = e.Router();

router.get('/get',
  new AddressController().get)

router.post('/create',
  new AddressController().create)

export default router
