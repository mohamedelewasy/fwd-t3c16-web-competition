import db from "../config/db";
import { MovieModel } from "../types/models";
import { Favourite, Movie } from "../types/schemas";

class Movies implements MovieModel {
  async get(): Promise<Movie[]> {
    const res = await db.query("SELECT * FROM movies;");
    return res.rows;
  }
  async show(movieId: number): Promise<Movie> {
    const res = await db.query("SELECT * FROM movies WHERE id=$1;", [movieId]);
    return res.rows[0];
  }
  async create(name: string, releasedAt: Date): Promise<Movie> {
    const res = await db.query(
      "INSERT INTO movies (name,releasedAt) VALUES ($1,$2) RETURNING *",
      [name, releasedAt]
    );
    return res.rows[0];
  }
  async delete(movieId: number): Promise<void> {
    const res = await db.query("DELETE FROM movies WHERE id=$1", [movieId]);
    return;
  }
  async update(
    movieId: number,
    name: string,
    releasedAt: Date
  ): Promise<Movie> {
    const res = await db.query(
      "UPDATE SET name=$1,releasedAt=$2 WHERE id=$3 RETURNING *",
      [name, releasedAt, movieId]
    );
    return res.rows[0];
  }
  async addMovieToFavourite(
    movieId: number,
    userId: number
  ): Promise<Favourite> {
    const res = await db.query(
      "INSERT INTO favourite (movieId,userId) VALUES ($1,$2) RETURNING *",
      [movieId, userId]
    );
    return res.rows[0];
  }
  async getFavouriteMovies(userId: number): Promise<Favourite[]> {
    const res = await db.query(
      "SELECT favourite.id,userId,movieId,watched,name,releasedAt FROM favourite INEER JOIN movies ON favourite.movieId=movies.id WHERE favourite.userId=$1;"
    );
    return res.rows;
  }
  async updateMovieWatchState(
    favouriteId: number,
    watched: boolean
  ): Promise<Favourite> {
    const res = await db.query("UPDATE SET watched=$1 RETURNING *", [watched]);
    return res.rows[0];
  }
  async deleteMovieFromFavourite(favouriteId: number): Promise<void> {
    const res = await db.query("DELETE FROM movies WHERE id=$1", [favouriteId]);
    return;
  }
}

const obj = new Movies();
export default obj;
