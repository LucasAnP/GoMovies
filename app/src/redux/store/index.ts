import { configureStore } from '@reduxjs/toolkit';

import { moviesReducer } from '../slices/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
