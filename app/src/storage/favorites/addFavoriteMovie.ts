import AsyncStorage from '@react-native-async-storage/async-storage';

import { MovieDTO } from '@dtos/MovieDTO';

import { FAVORITE_STORAGE } from '../storageConfig';
import { getFavoritedMovies } from './getFavoritedMovies';

export async function storageFavoriteMovie(movie: MovieDTO) {
  const storedMovies = await getFavoritedMovies();

  const moviesAlreadyAdded = storedMovies.filter(
    (movieStored) => movieStored.id === movie.id,
  );

  if (moviesAlreadyAdded.length > 0) {
    throw new Error('This movie was already favorited');
  }

  const storage = JSON.stringify([...storedMovies, movie]);
  await AsyncStorage.setItem(FAVORITE_STORAGE, storage);
}
