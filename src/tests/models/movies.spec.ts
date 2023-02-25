import pool from '../../config/db';
import Movies from '../../models/movies.model';

describe('movies model', () => {
  it('create a valid movie with id = 1', async () => {
    const res = await Movies.create('movie1', new Date(Date.now()));
    console.log(res);
    expect(res).toEqual(jasmine.objectContaining({ id: 1, name: 'movie1' }));
    expect(res.released_at).toBeDefined();
  });
  it('create a valid movie with id = 2', async () => {
    const res = await Movies.create('movie2', new Date(Date.now()));
    expect(res).toEqual(jasmine.objectContaining({ id: 2, name: 'movie2' }));
    expect(res.released_at).toBeDefined();
  });
  it('get a movie by id = 1', async () => {
    const res = await Movies.show(1);
    expect(res).toEqual(jasmine.objectContaining({ id: 1, name: 'movie1' }));
    expect(res.released_at).toBeDefined();
  });
  it('get list of movies', async () => {
    const res = await Movies.get();
    expect(res.length).toBe(2);
  });
  it('update movie for id=1', async () => {
    const res = await Movies.update(1, 'newMovie', new Date(Date.now()));
    expect(res).toEqual(jasmine.objectContaining({ id: 1, name: 'newMovie' }));
  });
  it('delete movie with id=1', async () => {
    await Movies.delete(1);
    const res = await Movies.show(1);
    expect(res).not.toBeDefined();
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
