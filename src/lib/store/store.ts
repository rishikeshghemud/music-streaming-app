import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;