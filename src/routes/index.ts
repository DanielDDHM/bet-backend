import e from 'express';
import usersRoutes from './users.routes'
import betsRoutes from './bets.routes'
import gameRoutes from './game.routes'

const rootRoutes = e.Router();

rootRoutes.use('/users', usersRoutes);
rootRoutes.use('/bets', betsRoutes);
rootRoutes.use('/game', gameRoutes);

export default rootRoutes;
