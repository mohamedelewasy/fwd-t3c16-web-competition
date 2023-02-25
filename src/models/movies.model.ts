import pool from '../config/db';
import { MovieModel } from '../types/models';
import { Favourite, FavouriteList, Movie } from '../types/schemas';

class Movies implements MovieModel {
  async get(): Promise<Movie[]> {
    const res = await pool.query('SELECT * FROM movies;');
    return res.rows;
  }
  async show(movie_id: number): Promise<Movie> {
    const res = await pool.query('SELECT * FROM movies WHERE id=$1;', [movie_id]);
    return res.rows[0];
  }
  async create(name: string, released_at: Date): Promise<Movie> {
    const res = await pool.query(
      'INSERT INTO movies (name,released_at) VALUES ($1,$2) RETURNING *',
      [name, released_at]
    );
    return res.rows[0];
  }
  async delete(movie_id: number): Promise<void> {
    await pool.query('DELETE FROM movies WHERE id=$1', [movie_id]);
    return;
  }
  async update(movie_id: number, name: string, released_at: Date): Promise<Movie> {
    const res = await pool.query(
      'UPDATE movies SET name=$1,released_at=$2 WHERE id=$3 RETURNING *',
      [name, released_at, movie_id]
    );
    return res.rows[0];
  }
  async addMovieToFavourite(movie_id: number, user_id: number): Promise<Favourite> {
    const res = await pool.query(
      'INSERT INTO favourite (movie_id,user_id) VALUES ($1,$2) RETURNING *',
      [movie_id, user_id]
    );
    return res.rows[0];
  }
  async getFavouriteMovies(user_id: number): Promise<FavouriteList[]> {
    const res = await pool.query(
      'SELECT favourite.id,movie_id,watched,name,released_at FROM favourite INNER JOIN movies ON favourite.movie_id=movies.id WHERE favourite.user_id=$1;',
      [user_id]
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
  async getMovieFromFavourite(userId: number, movieId: number): Promise<Favourite> {
    const res = await pool.query('SELECT * FROM favourite WHERE user_id=$1 AND movie_id=$2', [
      userId,
      movieId,
    ]);
    return res.rows[0];
  }
  async getMovieFromFavouriteByFavouriteId(
    userId: number,
    favouriteId: number
  ): Promise<Favourite> {
    const res = await pool.query('SELECT * FROM favourite WHERE user_id=$1 AND id=$2', [
      userId,
      favouriteId,
    ]);
    return res.rows[0];
  }
  async deleteMovieFromFavourite(favouriteId: number): Promise<void> {
    await pool.query('DELETE FROM favourite WHERE id=$1', [favouriteId]);
    return;
  }
}

const obj = new Movies();
export default obj;
