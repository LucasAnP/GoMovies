import AsyncStorage from '@react-native-async-storage/async-storage';

import { MovieDTO } from '@dtos/MovieDTO';

import { FAVORITE_STORAGE } from '../storageConfig';
import { getFavoritedMovies } from './getFavoritedMovies';

export async function removeAllStoragedFavoriteMovies() {
  await AsyncStorage.removeItem(FAVORITE_STORAGE);
}
// TODO: Tipar retorno
export async function removeStoragedMovie(movie: MovieDTO) {
  const storage = await getFavoritedMovies();
  const filtered = storage.filter(
    (movieStoraged) => movieStoraged.id != movie.id,
  );
  const movies = JSON.stringify(filtered);
  AsyncStorage.setItem(FAVORITE_STORAGE, movies);

  return JSON.parse(movies);
}
