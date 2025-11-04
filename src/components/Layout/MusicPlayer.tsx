'use client';

import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RootState } from '@/lib/store/store';
import {
  togglePlayPause,
  nextTrack,
  previousTrack,
  updateTime,
  setIsPlaying,
} from '@/lib/store/slices/playerSlice';
import { formatTime } from '@/lib/utils';

export const MusicPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, currentTime, duration } = useSelector(
    (state: RootState) => state.player    // Get global state
  );
  const audioRef = useRef<HTMLAudioElement>(null);    // Assign native HTML audio element to Ref hook

  // Load and play new track when currentTrack changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) {
      return;
    }

    const audio = audioRef.current;

    audio.src = currentTrack.preview;
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .catch(() => {
            dispatch(setIsPlaying(false));
          });
      }
    }
  }, [currentTrack, dispatch]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .catch((error) => {
            dispatch(setIsPlaying(false));
          });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, dispatch]);

  // Handle audio seconds changes
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(
        updateTime({
          currentTime: audioRef.current.currentTime,
          duration: audioRef.current.duration || 0,
        })
      );
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleEnded = () => {
    dispatch(nextTrack());
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    console.error('Error details:', {
      error: audio.error,
      networkState: audio.networkState,
      readyState: audio.readyState,
      src: audio.src,
    });
  };

  const handlePlayClick = () => {
    dispatch(togglePlayPause());
  };

  // If there is no current track hide the player
  if (!currentTrack) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
      />

      {/* Progress Bar */}
      <div className="h-1 bg-muted cursor-pointer" onClick={handleSeek}>
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Player Controls */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Album Art & Track Info */}
          <img
            src={currentTrack.album.cover_medium}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg hidden sm:block"
          />

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist.name}
            </p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                dispatch(previousTrack());
              }}
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handlePlayClick}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5" fill="currentColor" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                dispatch(nextTrack());
              }}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Time Display */}
          <div className="text-xs text-muted-foreground hidden md:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};