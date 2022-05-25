import e from 'express';
import usersRoutes from './users.routes'
import betsRoutes from './bets.routes'

const rootRoutes = e.Router();

rootRoutes.use('/users', usersRoutes);
rootRoutes.use('/bets', betsRoutes);

export default rootRoutes;
