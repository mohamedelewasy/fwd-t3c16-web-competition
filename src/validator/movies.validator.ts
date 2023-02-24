import { body, param } from 'express-validator';

import validator from '../middlewares/validator';

const getMovie = [
  param('movieId')
    .notEmpty()
    .withMessage('movie id is missing')
    .isInt()
    .withMessage('invalid movie id format'),
  validator,
];

const createMovie = [
  body('name').notEmpty().withMessage('name is required'),
  body('releasedAt')
    .notEmpty()
    .withMessage('releasedAt is required')
    .isDate()
    .withMessage('invalid releasedAt format'),
  validator,
];

const updateMovie = [
  param('movieId')
    .notEmpty()
    .withMessage('movie id is missing')
    .isInt()
    .withMessage('invalid movie id format'),
  body('name').notEmpty().withMessage('name is required'),
  body('releasedAt')
    .notEmpty()
    .withMessage('releasedAt is required')
    .isDate()
    .withMessage('invalid releasedAt format'),
  validator,
];

const deleteMovie = [
  param('movieId')
    .notEmpty()
    .withMessage('movie id is missing')
    .isInt()
    .withMessage('invalid movie id format'),
  validator,
];

const addMovieToFavourite = [
  param('movieId')
    .notEmpty()
    .withMessage('movie id is missing')
    .isInt()
    .withMessage('invalid movie id format'),
  validator,
];

const updateFavouriteMovie = [
  param('favouriteId')
    .notEmpty()
    .withMessage('favourite id is missing')
    .isInt()
    .withMessage('invalid favourite id format'),
  body('watched')
    .notEmpty()
    .withMessage('watched is required')
    .isBoolean()
    .withMessage('invalid watched format'),
  validator,
];

const deleteFavouriteMovie = [
  param('favouriteId')
    .notEmpty()
    .withMessage('favourite id is missing')
    .isInt()
    .withMessage('invalid favourite id format'),
  validator,
];

export default {
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  addMovieToFavourite,
  updateFavouriteMovie,
  deleteFavouriteMovie,
};
