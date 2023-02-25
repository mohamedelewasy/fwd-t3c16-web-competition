import supertest from 'supertest';

import app from '../../app';
import pool from '../../config/db';

const request = supertest(app);
describe('favourite endpoints', () => {
  let token: string;
  beforeAll(async () => {
    await request
      .post('/auth/signup')
      .send({ email: 'email@google.com', password: 'password', passwordConfirm: 'password' });
    const user = await request
      .post('/auth/login')
      .send({ email: 'email@google.com', password: 'password' });
    token = user.body.token;
    await request
      .post('/movies')
      .send({ name: 'movie1', releasedAt: '2000-10-10' })
      .set('Authorization', `Bearer ${token}`);
    await request
      .post('/movies')
      .send({ name: 'movie2', releasedAt: '2000-10-10' })
      .set('Authorization', `Bearer ${token}`);
    await request
      .post('/movies')
      .send({ name: 'movie3', releasedAt: '2000-10-10' })
      .set('Authorization', `Bearer ${token}`);
  });

  describe('add movie to favourite', () => {
    it('movie with id=1,2,3 to user id=1', async () => {
      const res1 = await request
        .post('/movies/1/favourite')
        .send({ movieId: 1 })
        .set('Authorization', `Bearer ${token}`);
      const res2 = await request
        .post('/movies/2/favourite')
        .send({ movieId: 2 })
        .set('Authorization', `Bearer ${token}`);
      const res3 = await request
        .post('/movies/3/favourite')
        .send({ movieId: 3 })
        .set('Authorization', `Bearer ${token}`);
      expect(res1.statusCode).toBe(200);
      expect(res1.body.data).toEqual({ id: 1, movie_id: 1, user_id: 1, watched: false });
      expect(res2.body.data).toEqual({ id: 2, movie_id: 2, user_id: 1, watched: false });
      expect(res3.body.data).toEqual({ id: 3, movie_id: 3, user_id: 1, watched: false });
    });
    it('movie without auth', async () => {
      const res = await request.post('/movies/1/favourite').send({ movieId: 1 });
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ msg: 'please login first' });
    });
    it('movie with id=1 for the second time', async () => {
      const res = await request
        .post('/movies/1/favourite')
        .send({ movieId: 1 })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ msg: 'movie is already in favourite' });
    });
  });

  describe('get favourite movies list', () => {
    it('user with id=1 with a valid token', async () => {
      const res = await request.get('/movies/favourite').set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toContain(jasmine.objectContaining({ movie_id: 1, name: 'movie1' }));
      expect(res.body.data).toContain(jasmine.objectContaining({ movie_id: 2, name: 'movie2' }));
      expect(res.body.data).toContain(jasmine.objectContaining({ movie_id: 3, name: 'movie3' }));
    });
    it('user with id=1 without a valid token', async () => {
      const res = await request.get('/movies/favourite');
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ msg: 'please login first' });
    });
  });

  describe('update favourite movie', () => {
    it('movie with id=1 to be watched', async () => {
      const res = await request
        .put('/movies/favourite/1')
        .send({ watched: true })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual({ id: 1, movie_id: 1, user_id: 1, watched: true });
    });

    it('movie with invalid id=20 to be watched', async () => {
      const res = await request
        .put('/movies/favourite/20')
        .send({ watched: true })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        msg: 'movie not found in favourite list with this favourite id : 20',
      });
    });

    it('movie without auth', async () => {
      const res = await request.put('/movies/favourite/1').send({ watched: true });
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ msg: 'please login first' });
    });
  });

  describe('delete movie from favourite list', () => {
    let token2: string;
    beforeAll(async () => {
      // create a token for user id 2
      await request
        .post('/auth/signup')
        .send({ email: 'email2@google.com', password: 'password', passwordConfirm: 'password' });
      const user = await request
        .post('/auth/login')
        .send({ email: 'email2@google.com', password: 'password' });
      token2 = user.body.token;
    });
    it("delete movie with favourite id=1 with it's user", async () => {
      await request.delete('/movies/favourite/1').set('Authorization', `Bearer ${token}`);
      const res = await request.get('/movies/favourite').set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).not.toContain(jasmine.objectContaining({ id: 1 }));
    });

    it('delete movie with favourite id=2 with invalid user id = 2', async () => {
      const res1 = await request
        .delete('/movies/favourite/2')
        .set('Authorization', `Bearer ${token2}`);
      expect(res1.statusCode).toBe(404);
      expect(res1.body).toEqual({ msg: 'movie not found in favourite list with favourite id : 2' });
    });
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
