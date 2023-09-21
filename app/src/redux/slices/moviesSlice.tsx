import { Alert } from 'react-native';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieDTO } from '@dtos/MovieDTO';
import { getFavoritedMovies } from '@storage/favorites/getFavoritedMovies';
import { storageFavoriteMovie } from '@storage/favorites/addFavoriteMovie';
import { MovieStoragedDTO } from '@dtos/MovieStoragedDTO';
import {
  removeAllStoragedFavoriteMovies,
  removeStoragedMovie,
} from '@storage/favorites/removeStoragedFavoriteMovies';

export const fetchFavorites = createAsyncThunk(
  'movies/fetchFavorites',
  async () => {
    try {
      console.log('Inside fetch');
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
      console.log('Inside addFavoriteMovie');

      const storagedMovies = await storageFavoriteMovie(movie);
      return storagedMovies;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },
);

export const removeFavoriteMovie = createAsyncThunk(
  'movies/removeFavoriteMovie',
  async (movie: MovieDTO) => {
    try {
      const restOfMovies = await removeStoragedMovie(movie);
      return restOfMovies;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },
);

export const removeAllFavoriteMovies = createAsyncThunk(
  'movies/removeAllFavoriteMovies',
  async () => {
    try {
      console.log('Inside');
      await removeAllStoragedFavoriteMovies();
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },
);

const initialState: MovieStoragedDTO = {
  isLoading: false,
  favoritedMovies: [] as MovieDTO[],
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
        // TODO: Adjust type error
        state.favoritedMovies = action.payload;
      })
      .addCase(addFavoriteMovie.rejected, (state) => {
        state.isLoading = false;
        Alert.alert('Movies', 'Unable to favorite movie');
      })

      .addCase(removeFavoriteMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavoriteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritedMovies = action.payload;
      })
      .addCase(removeFavoriteMovie.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(removeAllFavoriteMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAllFavoriteMovies.fulfilled, (state) => {
        state.isLoading = false;
        state.favoritedMovies = [];
      })
      .addCase(removeAllFavoriteMovies.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const moviesReducer = moviesSlice.reducer;
