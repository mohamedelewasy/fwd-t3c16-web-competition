CREATE TABLE favorite(
  id SERIAL PRIMARY KEY,
  movies_id INTEGER REFERENCES movies(id) NOT NULL,
  users_id INTEGER REFERENCES users(id) NOT NULL,
  watched BOOLEAN NOT NULL DEFAULT false
);