## API Endpoints

**Users**

- signup route: `/auth/signup` [POST]
- login route: `/auth/login` [POST]
- logout route: `/auth/logout` [GET]
- update email route: `/auth/update-email` [PUT]
- update password route: `/auth/update-password` [PUT]

**Movies**

- get list of movies: `/movies` [GET]
- get a movie route: `/movies/:movieId` [GET] (param:movieId)
- update a movie: `/movies/:movieId` [PUt] (param:movieId) [token-required]
- delete a movie: `/movies/:movieId` [DELETE] (param:movieId) [token-required]

**Favourite**

- get favourite list: `/movies/favourite` [GET] [token-required]
- add to favourite: `/movies/:movieId/favourite` [POST] (param:movieId) [token-required]
- update movie in favourite: `/movies/favourite/:favouriteId` [PUT] (param:favouriteId) [token-required]
- delete movie from favourite: `/movies/favourite/:favouriteId` [PUT] (param:favouriteId) [token-required]

## Data Shapes

**Users**

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(256) UNIQUE NOT NULL,
  password VARCHAR(256) NOT NULL
)
```

**Movies**

```sql
CREATE TABLE movies(
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  released_at DATE NOT NULL
);
```

**Favourite**

```sql
CREATE TABLE favourite(
  id SERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES movies(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  watched BOOLEAN NOT NULL DEFAULT false
);
```
