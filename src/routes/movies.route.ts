import express from 'express';

import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from '../handlers/movies.handler';

const router = express.Router();

router.route('/').get(getMovies).post(createMovie);
router.route('/:movieId').get(getMovie).put(updateMovie).delete(deleteMovie);

export default router;
