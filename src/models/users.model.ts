import db from "../config/db";

export interface User {
  id?: number;
  email: string;
  password: string;
}

export default class usres {
  static async show(userId: number): Promise<User> {
    const conn = await db.connect();
    const sql = "SELECT * FROM users WHERE id=$1";
    const users = await conn.query(sql, [userId]);
    conn.release();
    return users.rows[0];
  }

  static async index(): Promise<User[]> {
    const conn = await db.connect();
    const sql = "SELECT * FROM users";
    const users = await conn.query(sql);
    conn.release();
    return users.rows;
  }

  static async create(payload: User): Promise<User> {
    const conn = await db.connect();
    const sql = "INSERT INTO users (name, release) VALUES ($1,$2) RETURNING *";
    const users = await conn.query(sql, [payload.email, payload.password]);
    conn.release();
    return users.rows[0];
  }

  static async update(movieId: number, payload: User): Promise<User> {
    const conn = await db.connect();
    const sql = "UPDATE users SET name=$2,release=$3 WHERE id=$1 RETURNING *";
    const users = await conn.query(sql, [
      movieId,
      payload.email,
      payload.password,
    ]);
    conn.release();
    return users.rows[0];
  }

  static async delete(userId: number): Promise<User> {
    const conn = await db.connect();
    const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
    const users = await conn.query(sql, [userId]);
    conn.release();
    return users.rows[0];
  }
}
