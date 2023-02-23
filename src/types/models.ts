import { Favourite, Movie, User } from "./schemas";

export interface MovieModel {
  get(): Promise<Movie[]>;
  show(movieId: number): Promise<Movie>;
  create(name: string, releasedAt: Date): Promise<Movie>;
  delete(movieId: number): Promise<void>;
  update(movieId: number, name: string, releasedAt: Date): Promise<Movie>;
  getFavouriteMovies(userId: number): Promise<Favourite[]>;
  addMovieToFavourite(movieId: number, userId: number): Promise<Favourite>;
  updateMovieWatchState(
    favouriteId: number,
    watched: boolean
  ): Promise<Favourite>;
  deleteMovieFromFavourite(favouriteId: number): Promise<void>;
}

export interface UserModel {
  show(userId: number): Promise<User>;
  create(email: string, password: string): Promise<User>;
  updateEmail(userId: number, email: string): Promise<User>;
  updatePassword(userId: number, password: string): Promise<User>;
}
