import { Alert } from 'react-native';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieDTO } from '@dtos/MovieDTO';
import { getFavoritedMovies } from '@storage/favorites/getFavoritedMovies';

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

// export const addFavoriteMovie = createAsyncThunk(
//   'movies/addFavoriteMovie',
//   async () => {
//     try {
//       const favoritedMovies = await getFavoritedMovies();
//       return favoritedMovies;
//     } catch (error) {
//       console.warn(error);
//       throw error;
//     }
//   },
// );

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    isLoading: false,
    favoritedMovies: [] as MovieDTO[],
  },
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
      });
  },
});

export const moviesReducer = moviesSlice.reducer;
