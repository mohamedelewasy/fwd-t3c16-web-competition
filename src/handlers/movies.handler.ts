import { Request as Req, Response as Res, NextFunction as Next } from "express";
import Movies, { Movie } from "../models/movies.model";

// method   :GET
// route    :/movies/
export const getMovies = async (req: Req, res: Res, next: Next) => {
  try {
    const movies = await Movies.index();
    res.status(200).json({ data: movies });
  } catch (error) {
    res.status(400).json({ msg: "failed to connect to database" });
  }
};

// method   :GET
// route    :/movies/?movieId
export const getMovie = async (req: Req, res: Res, next: Next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movies.show(+movieId);
    res.status(200).json({ data: movie });
  } catch (error) {
    res.status(400).json({ msg: `movie not found for this id=${movieId}` });
  }
};

// method   :POST
// route    :/movies/
export const createMovie = async (req: Req, res: Res, next: Next) => {
  const { name, release } = req.body;
  try {
    const movie = await Movies.create({ name, release });
    res.status(200).json({ data: movie });
  } catch (error) {
    res.status(400).json({ msg: `failed to create movie` });
  }
};

// method   :PUT
// route    :/movies/?movieId
export const updateMovie = async (req: Req, res: Res, next: Next) => {
  const { movieId } = req.params;
  const { name, release } = req.body;
  try {
    const movie = await Movies.update(+movieId, { name, release });
    if (!movie)
      res.status(400).json({ msg: `movie not found for id=${movieId}` });
    else res.status(200).json({ data: movie });
  } catch (error) {
    res.status(400).json({ msg: `movie not found for id=${movieId}` });
  }
};

// method   :DELETE
// route    :/movies/?movieId
export const deleteMovie = async (req: Req, res: Res, next: Next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movies.delete(+movieId);
    if (!movie)
      res.status(400).json({ msg: `movie not found for id=${movieId}` });
    else res.status(200).json({ data: movie });
  } catch (error) {
    res.status(400).json({ msg: `movie not found for this id=${movieId}` });
  }
};
