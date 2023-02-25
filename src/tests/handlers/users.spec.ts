import supertest from 'supertest';

import app from '../../app';

const request = supertest(app);

describe('user endpoints', () => {
  describe('signup', () => {
    it('valid signup', async () => {
      const res = await request
        .post('/auth/signup')
        .send({ email: 'email@google.com', password: 'password', passwordConfirm: 'password' });

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toEqual({ id: 1, email: 'email@google.com' });
    });

    it('dublicated user', async () => {
      const res = await request
        .post('/auth/signup')
        .send({ email: 'email@google.com', password: 'password', passwordConfirm: 'password' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ msg: 'email is already exists' });
    });

    it(' missing confirm password field', async () => {
      const res = await request
        .post('/auth/signup')
        .send({ email: 'email@google.com', password: 'password' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain(
        jasmine.objectContaining({ msg: 'invalid confirmation password' })
      );
    });
  });

  describe('login', () => {
    it('login to valid user', async () => {
      const res = await request
        .post('/auth/login')
        .send({ email: 'email@google.com', password: 'password' });
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('login to invalid email', async () => {
      const res = await request
        .post('/auth/login')
        .send({ email: 'temp@google.com', password: 'password' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ msg: 'incorrect email or password' });
    });

    it('login to invalid password', async () => {
      const res = await request
        .post('/auth/login')
        .send({ email: 'email@google.com', password: 'incorrect' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ msg: 'incorrect email or password' });
    });
  });

  describe('logout', () => {
    let token: string;
    beforeAll(async () => {
      const user = await request
        .post('/auth/login')
        .send({ email: 'email@google.com', password: 'password' });
      token = user.body.token;
    });
    it('logout with valid token', async () => {
      const res = await request.get('/auth/logout').set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(204);
      const res2 = await request
        .get('/auth/logout')
        .set('Authorization', res.headers.authorization);
      expect(res2.statusCode).toBe(401);
      expect(res2.body).toEqual({ msg: 'please login first' });
    });

    it('logout with invalid token', async () => {
      const res = await request.get('/auth/logout');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('updateEmail', () => {
    let token: string;
    beforeAll(async () => {
      const user = await request
        .post('/auth/login')
        .send({ email: 'email@google.com', password: 'password' });
      token = user.body.token;
    });
    it('update with valid fields', async () => {
      const res = await request
        .put('/auth/update-email')
        .send({ email: 'google@google.com' })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ data: { email: 'google@google.com' } });
    });
    it('update with invalid token', async () => {
      const res = await request
        .put('/auth/update-email')
        .send({ email: 'google@google.com' })
        .set('Authorization', `Bearer ${token}invalidSignature`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ msg: 'bad token' });
    });
  });

  describe('updatePassword', () => {
    let token: string;
    beforeAll(async () => {
      const user = await request
        .post('/auth/login')
        .send({ email: 'google@google.com', password: 'password' });
      token = user.body.token;
    });
    it('update with valid fields', async () => {
      const res = await request
        .put('/auth/update-password')
        .send({ password: 'password', newPassword: 'newPassword', passwordConfirm: 'newPassword' })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });
    it('update with invalid token', async () => {
      const res = await request
        .put('/auth/update-password')
        .send({ password: 'password', newPassword: 'newPassword', passwordConfirm: 'newPassword' })
        .set('Authorization', `Bearer ${token}invalidSignature`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ msg: 'bad token' });
    });
    it('update with invalid passwordConfirm field', async () => {
      const res = await request
        .put('/auth/update-password')
        .send({ password: 'password', newPassword: 'newPassword', passwordConfirm: 'incorrect' })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain(
        jasmine.objectContaining({ msg: 'invalid confirmation password' })
      );
    });
    it('update with incorrect old password field', async () => {
      const res = await request
        .put('/auth/update-password')
        .send({ password: 'incorrect', newPassword: 'newPassword', passwordConfirm: 'newPassword' })
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ msg: 'incorrect password' });
    });
  });
});
