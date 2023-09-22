import AsyncStorage from '@react-native-async-storage/async-storage';

import { MovieDTO } from '@dtos/MovieDTO';

import { FAVORITE_STORAGE } from '../storageConfig';

export async function getFavoritedMovies(): Promise<MovieDTO[]> {
  const storage = await AsyncStorage.getItem(FAVORITE_STORAGE);
  const favoritedMovies: MovieDTO[] = storage ? JSON.parse(storage) : [];

  return favoritedMovies;
}
