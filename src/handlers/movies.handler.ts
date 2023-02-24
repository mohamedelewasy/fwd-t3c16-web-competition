import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import Movies from '../models/movies.model';

// method   :GET
// route    :/movies/
export const getMovies: RequestHandler = asyncHandler(async (req, res, next) => {
  const movies = await Movies.get();
  res.status(200).json({ length: movies.length, data: movies });
});

// method   :GET
// route    :/movies/?movieId
export const getMovie: RequestHandler = asyncHandler(async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await Movies.show(+movieId);
  if (!movie) res.status(404).json({ msg: `movie not found for this id=${movieId}` });
  else res.status(200).json({ data: movie });
});

// method   :POST
// route    :/movies/
export const createMovie: RequestHandler = asyncHandler(async (req, res, next) => {
  const name: string = req.body.name;
  const releasedAt: Date = req.body.releasedAt;
  const movie = await Movies.create(name, releasedAt);
  res.status(200).json({ data: movie });
});

// method   :PUT
// route    :/movies/?movieId
export const updateMovie: RequestHandler = asyncHandler(async (req, res, next) => {
  const movieId: number = +req.params.movieId;
  const name: string = req.body.name;
  const releasedAt: Date = req.body.releasedAt;
  const movie = await Movies.update(movieId, name, releasedAt);
  if (!movie) res.status(404).json({ msg: `movie not found for id=${movieId}` });
  else res.status(200).json({ data: movie });
});

// method   :DELETE
// route    :/movies/?movieId
export const deleteMovie: RequestHandler = asyncHandler(async (req, res, next) => {
  const movieId: number = +req.params.movieId;
  await Movies.delete(movieId);
  res.status(204).send();
});
