import { PoolClient } from 'pg';

import pool from '../config/db';
import { UserModel } from '../types/models';
import { User } from '../types/schemas';

class Users implements UserModel {
  async show(user_id: number): Promise<User> {
    const res = await pool.query('SELECT * FROM users WHERE id=$1', [user_id]);
    return res.rows[0];
  }
  async create(email: string, password: string): Promise<User> {
    const res = await pool.query('INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *', [
      email,
      password,
    ]);
    return res.rows[0];
  }
  async updateEmail(user_id: number, email: string): Promise<User> {
    const res = await pool.query('UPDATE users SET email=$1 WHERE id=$2 RETURNING *', [
      email,
      user_id,
    ]);
    return res.rows[0];
  }
  async updatePassword(user_id: number, password: string): Promise<User> {
    const res = await pool.query('UPDATE users SET password=$1 WHERE id=$2 RETURNING *', [
      password,
      user_id,
    ]);
    return res.rows[0];
  }
  async getByEmail(email: string): Promise<User> {
    const res = await pool.query('SELECT * FROM users WHERE email=$1;', [email]);
    return res.rows[0];
  }
}

const obj = new Users();

export default obj;
