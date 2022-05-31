import e from 'express';
import usersRoutes from './users.routes'
import betsRoutes from './bets.routes'
import gameRoutes from './game.routes'
import addressRoutes from './address.routes'
import internalRoutes from './internal.routes'

const rootRoutes = e.Router();

rootRoutes.use('/users', usersRoutes);
rootRoutes.use('/bets', betsRoutes);
rootRoutes.use('/game', gameRoutes);
rootRoutes.use('/address', addressRoutes);
rootRoutes.use('/internal', internalRoutes);

export default rootRoutes;
