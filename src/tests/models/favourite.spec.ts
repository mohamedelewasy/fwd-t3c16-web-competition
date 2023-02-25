import pool from '../../config/db';
import Movies from '../../models/movies.model';
import Users from '../../models/users.model';

describe('favourite model', () => {
  beforeAll(async () => {
    await Users.create('user1', 'password');
    await Users.create('user2', 'password');
    await Movies.create('movie1', new Date(Date.now()));
    await Movies.create('movie2', new Date(Date.now()));
  });

  it('add to favourite movie with id=1 to user with id=1', async () => {
    const res = await Movies.addMovieToFavourite(1, 1);
    expect(res).toEqual({ id: 1, movie_id: 1, user_id: 1, watched: false });
  });
  it('add to favourite movie with id=2 to user with id=1', async () => {
    const res = await Movies.addMovieToFavourite(2, 1);
    expect(res).toEqual({ id: 2, movie_id: 2, user_id: 1, watched: false });
  });
  it('add to favourite movie with id=1 to user with id=2', async () => {
    const res = await Movies.addMovieToFavourite(1, 2);
    expect(res).toEqual({ id: 3, movie_id: 1, user_id: 2, watched: false });
  });
  it('add to favourite movie with id=1 to user with id=2', async () => {
    const res = await Movies.addMovieToFavourite(2, 2);
    expect(res).toEqual({ id: 4, movie_id: 2, user_id: 2, watched: false });
  });
  it('get favourite movies list for user id = 1', async () => {
    const res = await Movies.getFavouriteMovies(1);
    expect(res).toContain(
      jasmine.objectContaining({ id: 1, movie_id: 1, watched: false, name: 'movie1' })
    );
    expect(res).toContain(
      jasmine.objectContaining({ id: 2, movie_id: 2, watched: false, name: 'movie2' })
    );
  });

  it('get favourite movie by favourite id=1 for user id = 1', async () => {
    const res = await Movies.getMovieFromFavouriteByFavouriteId(1, 1);
    expect(res).toEqual({ id: 1, movie_id: 1, user_id: 1, watched: false });
  });

  it('update favourite movie id = 1 for user id = 1 to watched=true', async () => {
    const res = await Movies.updateMovieWatchState(1, true);
    expect(res).toEqual({ id: 1, movie_id: 1, user_id: 1, watched: true });
  });
  it('update favourite movie id = 2 for user id = 1 to watched=true', async () => {
    const res = await Movies.updateMovieWatchState(2, true);
    expect(res).toEqual({ id: 2, movie_id: 2, user_id: 1, watched: true });
  });
  it('delete favourite movie id = 2 for user id = 1', async () => {
    await Movies.deleteMovieFromFavourite(2);
    const res = await Movies.getFavouriteMovies(1);
    expect(res.length).toBe(1);
  });

  it('expect no change for favourite list for user id = 2', async () => {
    const res = await Movies.getFavouriteMovies(2);
    expect(res).toContain(
      jasmine.objectContaining({ id: 3, movie_id: 1, watched: false, name: 'movie1' })
    );
    expect(res).toContain(
      jasmine.objectContaining({ id: 4, movie_id: 2, watched: false, name: 'movie2' })
    );
    expect(res[0].released_at).toBeDefined();
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      'DELETE FROM favourite; ALTER SEQUENCE favourite_id_seq RESTART WITH 1;' +
      'DELETE FROM movies; ALTER SEQUENCE movies_id_seq RESTART WITH 1;' +
      'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release();
  });
});
