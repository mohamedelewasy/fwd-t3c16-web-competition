import supertest from 'supertest';

import app from '../../app';
import pool from '../../config/db';

const request = supertest(app);

fdescribe('movies endpoints', () => {
  let token: string;
  beforeAll(async () => {
    await request
      .post('/auth/signup')
      .send({ email: 'email@google.com', password: 'password', passwordConfirm: 'password' });
    const user = await request
      .post('/auth/login')
      .send({ email: 'email@google.com', password: 'password' });
    token = user.body.token;
  });
  describe('create movie', () => {
    it('create a valid movie', async () => {
      const res = await request
        .post('/movies')
        .send({ name: 'movie1', releasedAt: '2000-08-01' })
        .set('Authorization', `Bearer ${token}`);
      console.log(res.body);
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toEqual(jasmine.objectContaining({ name: 'movie1' }));
      expect(res.body.data.released_at).toBeDefined();
    });
    it('create a valid movie with invalid auth', async () => {
      const res = await request
        .post('/movies')
        .send({ name: 'movie1', releasedAt: '2000-08-01' })
        .set('Authorization', `Bearer ${token}invalidSignature`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ msg: 'bad token' });
    });
    it('create a movie with missing field', async () => {
      const res = await request
        .post('/movies')
        .send({ name: 'movie1' })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain(
        jasmine.objectContaining({ msg: 'releasedAt is required' })
      );
    });
  });

  describe('get movies', () => {
    it('get list of movies', async () => {
      const res = await request.get('/movies');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body.data).toBeDefined();
    });

    it('get a single of movies with id=1', async () => {
      const res = await request.get('/movies/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(jasmine.objectContaining({ id: 1, name: 'movie1' }));
    });

    it('get a single of movies with invalid id=2', async () => {
      const res = await request.get('/movies/2');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ msg: 'movie not found for this id : 2' });
    });
  });

  describe('update movie', () => {
    it('update a valid movie with id=1', async () => {
      const res = await request
        .put('/movies/1')
        .send({ name: 'new movie name', releasedAt: '2010-05-01' })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(jasmine.objectContaining({ id: 1, name: 'new movie name' }));
    });

    it('update an invalid movie with id=2', async () => {
      const res = await request
        .put('/movies/2')
        .send({ name: 'new movie name', releasedAt: '2010-05-01' })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ msg: 'movie not found for this id : 2' });
    });

    it('update a valid movie without auth', async () => {
      const res = await request
        .put('/movies/1')
        .send({ name: 'new movie name', releasedAt: '2010-05-01' });
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ msg: 'please login first' });
    });
  });

  describe('delete movie', () => {
    it('delete a valid movie with id=1', async () => {
      const res = await request.delete('/movies/1').set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(204);
      const res2 = await request.get('/movies/1');
      expect(res2.statusCode).toBe(404);
    });

    // TODO :handle this test case
    it('delete an invalid movie with id=1', async () => {
      const res = await request.delete('/movies/1').set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ msg: 'movie not found for this id : 1' });
    });

    it('update a valid movie without auth', async () => {
      const res = await request.delete('/movies/1');
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ msg: 'please login first' });
    });
  });
});
