import { PoolClient } from 'pg';

import pool from '../config/db';
import { MovieModel } from '../types/models';
import { Favourite, FavouriteList, Movie } from '../types/schemas';

class Movies implements MovieModel {
  async get(): Promise<Movie[]> {
    const res = await pool.query('SELECT * FROM movies;');
    return res.rows;
  }
  async show(movieId: number): Promise<Movie> {
    const res = await pool.query('SELECT * FROM movies WHERE id=$1;', [movieId]);
    return res.rows[0];
  }
  async create(name: string, releasedAt: Date): Promise<Movie> {
    const res = await pool.query(
      'INSERT INTO movies (name,releasedAt) VALUES ($1,$2) RETURNING *',
      [name, releasedAt]
    );
    return res.rows[0];
  }
  async delete(movieId: number): Promise<void> {
    const res = await pool.query('DELETE FROM movies WHERE id=$1', [movieId]);
    return;
  }
  async update(movieId: number, name: string, releasedAt: Date): Promise<Movie> {
    const res = await pool.query(
      'UPDATE movies SET name=$1,releasedAt=$2 WHERE id=$3 RETURNING *',
      [name, releasedAt, movieId]
    );
    return res.rows[0];
  }
  async addMovieToFavourite(movieId: number, userId: number): Promise<Favourite> {
    const res = await pool.query(
      'INSERT INTO favourite (movieId,userId) VALUES ($1,$2) RETURNING *',
      [movieId, userId]
    );
    return res.rows[0];
  }
  async getFavouriteMovies(userId: number): Promise<FavouriteList[]> {
    const res = await pool.query(
      'SELECT favourite.id,movieId,watched,name,releasedAt FROM favourite INNER JOIN movies ON favourite.movieId=movies.id WHERE favourite.userId=$1;',
      [userId]
    );
    return res.rows;
  }
  async updateMovieWatchState(favouriteId: number, watched: boolean): Promise<Favourite> {
    const res = await pool.query('UPDATE favourite SET watched=$1 WHERE id=$2 RETURNING *', [
      watched,
      favouriteId,
    ]);
    return res.rows[0];
  }
  async deleteMovieFromFavourite(favouriteId: number): Promise<void> {
    const res = await pool.query('DELETE FROM favourite WHERE id=$1', [favouriteId]);
    return;
  }
}

const obj = new Movies();
export default obj;
