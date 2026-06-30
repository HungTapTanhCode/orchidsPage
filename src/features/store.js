import { configureStore } from '@reduxjs/toolkit';
import orchidsReducer from './orchidsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    orchids: orchidsReducer,
    auth: authReducer,
  },
});
