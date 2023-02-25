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
import val from '../validator/movies.validator';

const router = express.Router();

router.route('/').get(getMovies).post(protect, val.createMovie, createMovie);
router.route('/favourite').get(protect, getFavouriteMovies);
router
  .route('/favourite/:favouriteId')
  .put(protect, val.updateFavouriteMovie, updateFavouriteMovie)
  .delete(protect, val.deleteFavouriteMovie, deleteFavouriteMovie);
router
  .route('/:movieId')
  .get(val.getMovie, getMovie)
  .put(protect, val.updateMovie, updateMovie)
  .delete(protect, val.deleteMovie, deleteMovie);
router.route('/:movieId/favourite').post(protect, val.addMovieToFavourite, addMovieToFavourite);

export default router;
