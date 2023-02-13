CREATE TABLE favorite(
  id SERIAL PRIMARY KEY,
  movies_id INTEGER REFERENCES movies(id),
  users_id INTEGER REFERENCES users(id),
  watched BOOLEAN
);