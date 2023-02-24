import express from 'express';

import moviesRoutes from './movies.route';
import usersRoutes from './users.route';

const router = express.Router();

router.use('/movies', moviesRoutes);
router.use('/auth', usersRoutes);
export default router;
