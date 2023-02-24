CREATE TABLE favourite(
  id SERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES movies(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  watched BOOLEAN NOT NULL DEFAULT false
);