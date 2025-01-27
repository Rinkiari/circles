import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';

export const store = configureStore({
  reducer: { eventsReducer },
});
