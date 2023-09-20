import { Alert } from 'react-native';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieDTO } from '@dtos/MovieDTO';
import { getFavoritedMovies } from '@storage/favorites/getFavoritedMovies';
import { storageFavoriteMovie } from '@storage/favorites/addFavoriteMovie';

export const fetchFavorites = createAsyncThunk(
  'movies/fetchFavorites',
  async () => {
    try {
      const favoritedMovies = await getFavoritedMovies();
      return favoritedMovies;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },
);

export const addFavoriteMovie = createAsyncThunk(
  'movies/addFavoriteMovie',
  async (movie: MovieDTO) => {
    try {
      await storageFavoriteMovie(movie);
    } catch (error) {
      // TODO: fix type
      Alert.alert('Unable to favorite', error.message);
    }
  },
);

type movieStateType = {
  isLoading: boolean;
  favoritedMovies: MovieDTO[];
};

const initialState: movieStateType = {
  isLoading: false,
  favoritedMovies: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritedMovies = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isLoading = false;
        Alert.alert('Movies', 'Unable to load favorite movies');
      })
      .addCase(addFavoriteMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavoriteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritedMovies = action.payload;
      })
      .addCase(addFavoriteMovie.rejected, (state) => {
        state.isLoading = false;
        Alert.alert('Movies', 'Unable to favorite movie');
      });
  },
});

export const moviesReducer = moviesSlice.reducer;
