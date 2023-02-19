import db from "../config/db";

export interface Movie {
  id?: number;
  name: string;
  release: Date;
}

export default class movies {
  static async show(movieId: number): Promise<Movie> {
    const conn = await db.connect();
    const sql = "SELECT * FROM movies WHERE id=$1";
    const movies = await conn.query(sql, [movieId]);
    conn.release();
    return movies.rows[0];
  }

  static async index(): Promise<Movie[]> {
    const conn = await db.connect();
    const sql = "SELECT * FROM movies";
    const movies = await conn.query(sql);
    conn.release();
    return movies.rows;
  }

  static async create(payload: Movie): Promise<Movie> {
    const conn = await db.connect();
    const sql = "INSERT INTO movies (name, release) VALUES ($1,$2) RETURNING *";
    const movies = await conn.query(sql, [payload.name, payload.release]);
    conn.release();
    return movies.rows[0];
  }

  static async update(movieId: number, payload: Movie): Promise<Movie> {
    const conn = await db.connect();
    const sql = "UPDATE movies SET name=$2,release=$3 WHERE id=$1 RETURNING *";
    const movies = await conn.query(sql, [
      movieId,
      payload.name,
      payload.release,
    ]);
    conn.release();
    return movies.rows[0];
  }

  static async delete(movieId: number): Promise<Movie> {
    const conn = await db.connect();
    const sql = "DELETE FROM movies WHERE id=$1 RETURNING *";
    const movies = await conn.query(sql, [movieId]);
    conn.release();
    return movies.rows[0];
  }

  static async getFavoriteMovies(userId: number){
    const conn = await db.connect()
    const sql = "SELECT * FROM favorite INNER JOIN movies ON favorite.movies_id=movies.id WHERE favorite.user_id=$1"
    const res = await conn.query(sql, [userId])
    conn.release()
    return res.rows;
  }

  static async addMovieToFavorite(userId: number, movieId: number){
    const conn = await db.connect()
    const sql = "INSERT INTO favorite (movies_id, users_id, watched) VALUES ($1,$2,false) RETURNING *"
    const res = await conn.query(sql, [movieId,userId])
    conn.release()
    return res.rows[0];
  }

  static async updateWatchedMovie(id: number, watched: boolean){
    const conn = await db.connect()
    const sql = "UPDATE SET watched=$1 WHERE id=$2"
    const res = await conn.query(sql, [watched,id])
    conn.release()
    return res.rows[0];
  }
}
