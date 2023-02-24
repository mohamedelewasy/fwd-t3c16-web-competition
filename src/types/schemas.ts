export interface Movie {
  id: number;
  name: string;
  released_at: Date;
}

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Favourite {
  id: number;
  movie_id: number;
  user_id: number;
  watched: boolean;
}

export interface FavouriteList {
  id: number;
  movie_id: number;
  watched: boolean;
  name: string;
  released_at: boolean;
}

export interface JWT {
  user_id: number;
}
