import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';

import { MovieDTO } from '@dtos/MovieDTO';

import { FAVORITE_STORAGE } from '../storageConfig';
import { getFavoritedMovies } from './getFavoritedMovies';

export async function addFavoriteMovie(movie: MovieDTO) {
  try {
    const storedMovies = await getFavoritedMovies();
    const moviesAlreadyAdded = storedMovies.filter(
      (movie) => movie.id === movie.id,
    );

    if (moviesAlreadyAdded.length > 0) {
      throw new AppError('This movie already was favorited');
    }

    const storage = JSON.stringify([...storedMovies, movie]);
    await AsyncStorage.setItem(FAVORITE_STORAGE, storage);
  } catch (error) {
    console.warn(error);
    throw error;
  }
}
