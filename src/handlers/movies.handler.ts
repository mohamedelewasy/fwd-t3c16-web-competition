import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import Movies from '../models/movies.model';

// method   :GET
// route    :/movies/
export const getMovies: RequestHandler = asyncHandler(async (req, res) => {
  const movies = await Movies.get();
  res.status(200).json({ length: movies.length, data: movies });
});

// method   :GET
// route    :/movies/:movieId
export const getMovie: RequestHandler = asyncHandler(async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await Movies.show(+movieId);
  if (!movie) res.status(404).json({ msg: `movie not found for this id : ${movieId}` });
  else res.status(200).json({ data: movie });
});

// method   :POST
// route    :/movies/
// access   :protected
export const createMovie: RequestHandler = asyncHandler(async (req, res) => {
  const name: string = req.body.name;
  const releasedAt: Date = req.body.releasedAt;
  const movie = await Movies.create(name, releasedAt);
  res.status(201).json({ data: movie });
});

// method   :PUT
// route    :/movies/:movieId
// access   :protected
export const updateMovie: RequestHandler = asyncHandler(async (req, res) => {
  const movieId: number = +req.params.movieId;
  const name: string = req.body.name;
  const releasedAt: Date = req.body.releasedAt;
  const movie = await Movies.update(movieId, name, releasedAt);
  if (!movie) res.status(404).json({ msg: `movie not found for this id : ${movieId}` });
  else res.status(200).json({ data: movie });
});

// method   :DELETE
// route    :/movies/?movieId
// access   :protected
export const deleteMovie: RequestHandler = asyncHandler(async (req, res) => {
  const movieId: number = +req.params.movieId;
  const movie = await Movies.show(movieId);
  if (!movie) {
    res.status(404).json({ msg: `movie not found for this id : ${movieId}` });
    return;
  }
  await Movies.delete(movieId);
  res.status(204).send();
});

// method   :post
// route    :/movies/?movieId/favourite
// access   :protected
export const addMovieToFavourite: RequestHandler = asyncHandler(async (req, res) => {
  const userId: number = +res.locals.userId;
  const movieId: number = +req.params.movieId;
  const movie = await Movies.getMovieFromFavourite(userId, movieId);
  if (movie) {
    res.status(400).json({ msg: 'movie is already in favourite' });
    return;
  }
  const favourite = await Movies.addMovieToFavourite(movieId, userId);
  res.status(200).json({ data: favourite });
});

// method   :get
// route    :/movies/favourite
// access   :protected
export const getFavouriteMovies: RequestHandler = asyncHandler(async (req, res) => {
  const userId: number = +res.locals.userId;
  const favouriteList = await Movies.getFavouriteMovies(userId);
  res.status(200).json({ data: favouriteList });
});

// method   :put
// route    :/movies/favourite/:favouriteId
// access   :protected
export const updateFavouriteMovie: RequestHandler = asyncHandler(async (req, res) => {
  const favouriteId: number = +req.params.favouriteId;
  const watched: boolean = req.body.watched;
  const favourite = await Movies.updateMovieWatchState(favouriteId, watched);
  if (!favourite) {
    res
      .status(404)
      .json({ msg: `movie not found in favourite list with this favourite id : ${favouriteId}` });
    return;
  }
  res.status(200).json({ data: favourite });
});

// method   :delete
// route    :/movies/favourite/:favouriteId
// access   :protected
export const deleteFavouriteMovie: RequestHandler = asyncHandler(async (req, res) => {
  const favouriteId: number = +req.params.favouriteId;
  const userId: number = +res.locals.userId;
  const movie = await Movies.getMovieFromFavouriteByFavouriteId(userId, favouriteId);
  if (!movie) {
    res
      .status(404)
      .json({ msg: `movie not found in favourite list with favourite id : ${favouriteId}` });
    return;
  }
  await Movies.deleteMovieFromFavourite(favouriteId);
  res.status(204).send();
});
