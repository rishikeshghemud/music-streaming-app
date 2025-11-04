import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, PlayerState } from '@/types/music';

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  currentTime: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.currentTime = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setQueue: (state, action: PayloadAction<Track[]>) => {
      state.queue = action.payload;
    },
    nextTrack: (state) => {
      if (!state.currentTrack || state.queue.length === 0) return;
      
      const currentIndex = state.queue.findIndex(
        (t) => t.id === state.currentTrack?.id
      );
      
      if (currentIndex < state.queue.length - 1) {
        state.currentTrack = state.queue[currentIndex + 1];
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
    previousTrack: (state) => {
      if (!state.currentTrack || state.queue.length === 0) return;
      
      const currentIndex = state.queue.findIndex(
        (t) => t.id === state.currentTrack?.id
      );
      
      if (currentIndex > 0) {
        state.currentTrack = state.queue[currentIndex - 1];
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
    updateTime: (
      state,
      action: PayloadAction<{ currentTime: number; duration: number }>
    ) => {
      state.currentTime = action.payload.currentTime;
      state.duration = action.payload.duration;
    },
    seekTo: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  togglePlayPause,
  setIsPlaying,
  setQueue,
  nextTrack,
  previousTrack,
  updateTime,
  seekTo,
} = playerSlice.actions;

export default playerSlice.reducer;