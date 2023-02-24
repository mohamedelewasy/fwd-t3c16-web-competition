import express from 'express';

import {
  addMovieToFavourite,
  createMovie,
  deleteFavouriteMovie,
  deleteMovie,
  getFavouriteMovies,
  getMovie,
  getMovies,
  updateFavouriteMovie,
  updateMovie,
} from '../handlers/movies.handler';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.route('/').get(getMovies).post(createMovie);
router.route('/favourite').get(protect, getFavouriteMovies);
router.route('/favourite/:favouriteId').put(updateFavouriteMovie).delete(deleteFavouriteMovie);
router.route('/:movieId').get(getMovie).put(updateMovie).delete(deleteMovie);
router.route('/:movieId/favourite').post(protect, addMovieToFavourite);

export default router;
