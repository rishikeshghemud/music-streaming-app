import { Track, Artist, Album } from '@/types/music';

interface TracksResponse {
  tracks: Track[];
  nextPage: number;
}

// Function used by tanstack to fetch tracks
export const fetchTrendingTracks = async ({ pageParam = 0 }): Promise<TracksResponse> => {
  const response = await fetch(
    `/api/music/tracks?limit=12&index=${pageParam}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending tracks');
  }
  
  const data = await response.json();
  
  return {
    tracks: data.data,
    nextPage: pageParam + 20,
  };
};

// Function used by tanstack to fetch Artists
export const fetchTopArtists = async (): Promise<Artist[]> => {
  const response = await fetch('/api/music/artists?limit=12');
  
  if (!response.ok) {
    throw new Error('Failed to fetch top artists');
  }
  
  const data = await response.json();
  return data.data;
};

// Function used by tanstack to fetch Albums
export const fetchNewReleases = async (): Promise<Album[]> => {
  const response = await fetch('/api/music/albums?limit=12');
  
  if (!response.ok) {
    throw new Error('Failed to fetch new releases');
  }
  
  const data = await response.json();
  return data.data;
};
