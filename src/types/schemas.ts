export interface Movie{
  id: number;
  name: string;
  releasedAt: Date;
}

export interface User{
  id: number;
  email: string;
  password: string;
}

export interface Favourite{
  id: number;
  movieId: number;
  userId: number;
  watched: boolean
}
