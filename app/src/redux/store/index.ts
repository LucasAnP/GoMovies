import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { moviesReducer } from '../slices/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
