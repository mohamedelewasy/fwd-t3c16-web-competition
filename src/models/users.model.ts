import { PoolClient } from 'pg';

import pool from '../config/db';
import { UserModel } from '../types/models';
import { User } from '../types/schemas';

class Users implements UserModel {
  private db!: PoolClient;
  async open() {
    this.db = await pool;
  }
  async show(userId: number): Promise<User> {
    const res = await this.db.query('SELECT * FROM users WHERE id=$1', [userId]);
    return res.rows[0];
  }
  async create(email: string, password: string): Promise<User> {
    const res = await this.db.query(
      'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *'
    );
    return res.rows[0];
  }
  async updateEmail(userId: number, email: string): Promise<User> {
    const res = await this.db.query('UPDATE users SET email=$1 WHERE id=$2', [email, userId]);
    return res.rows[0];
  }
  async updatePassword(userId: number, password: string): Promise<User> {
    const res = await this.db.query('UPDATE users SET password=$1 WHERE id=$2 RETURNING *');
    return res.rows[0];
  }
  async getByEmail(email: string): Promise<User> {
    const res = await this.db.query('SELECT * FROM users WHERE email=$1;', [email]);
    return res.rows[0];
  }
}

const obj = new Users();
obj.open();
export default obj;
