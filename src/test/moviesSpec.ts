import movies from "../models/movies.model";
import Client from "../config/db";

describe("movies Model", () => {
  beforeAll(async function () {
    const connection = await Client.connect();
    const sql = "DELETE FROM movies; ALTER SEQUENCE moviess_id_seq RESTART;"; // Make sure that movies table is fresh
    await connection.query(sql);
    connection.release();
  });

  it("should have an index method", () => {
    expect(movies.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(movies.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(movies.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(movies.update).toBeDefined();
  });

  it("should have a create method", () => {
    expect(movies.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(movies.delete).toBeDefined();
  });

  it("create method should add a movie", async () => {
    // @ts-ignore
    const result = await movies.create({
      name: "The movie",
      release: new Date(2000, 1, 1),
    });
    expect(result).toEqual({
      id: 1,
      name: "The movie",
      release: new Date(2000, 1, 1),
    });
  });

  it("index method should return a list of movie", async () => {
    const result = await movies.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "The movie",
        release: new Date(2000, 1, 1),
      },
    ]);
  });

  it("show method should return the correct movie", async () => {
    const result = await movies.show(1);
    expect(result).toEqual({
      id: 1,
      name: "The movie",
      release: new Date(2000, 1, 1),
    });
  });

  it("update method should return the updated movie", async () => {
    const result = await movies.update(1, {
      name: "The great movie",
      release: new Date(2020, 1, 1),
    });
    expect(result).toEqual({
      id: 1,
      name: "The great movie",
      release: new Date(2020, 1, 1),
    });
  });

  it("delete method should return the deleted movie", async () => {
    const result = await movies.delete(1);
    expect(result).toEqual({
      id: 1,
      name: "The great movie",
      release: new Date(2020, 1, 1),
    });
  });
});

import app from "../server";
import supertest from "supertest";
const request = supertest(app);

describe("movies endpoints", () => {
  beforeAll(async function () {
    const connection = await Client.connect();
    const sql =
      "DELETE FROM moviess; ALTER SEQUENCE moviess_id_seq RESTART; DELETE FROM users;"; // Make sure that movies table is fresh
    await connection.query(sql);
    connection.release();
  });

  it("create api should add a movie", async () => {
    const response = await request
      .post("/movies")
      .send({ name: "The movie", release: new Date(2000, 1, 1) });
    expect(response.status).toBe(200);
  });

  it("index api should return a list of movies", async () => {
    const response = await request.get("/movies");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "The movie", release: new Date(2000, 1, 1) },
    ]);
  });

  it("show api should return the correct movie", async () => {
    const response = await request.get("/movies/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "The movie",
      release: new Date(2000, 1, 1),
    });
  });

  it("update api should update the movie", async () => {
    const response = await request
      .put("/movies/1")
      .send({ name: "The great movie", release: new Date(2002, 1, 1) });
    expect(response.status).toBe(200);
  });

  it("delete api should delete the movie", async () => {
    const response = await request.delete("/movies/1");
    expect(response.status).toBe(200);
  });
});
