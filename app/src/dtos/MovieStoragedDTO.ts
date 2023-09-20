import { MovieDTO } from './MovieDTO';

export type MovieStoragedDTO = {
  isLoading: boolean;
  favoritedMovies: MovieDTO[];
};
