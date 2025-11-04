import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchTrendingTracks, fetchTopArtists, fetchNewReleases } from '@/lib/api/music';

export const useTrendingTracks = () => {
  return useInfiniteQuery({
    queryKey: ['trending-tracks'],
    queryFn: fetchTrendingTracks,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const useTopArtists = () => {
  return useQuery({
    queryKey: ['top-artists'],
    queryFn: fetchTopArtists,
  });
};

export const useNewReleases = () => {
  return useQuery({
    queryKey: ['new-releases'],
    queryFn: fetchNewReleases,
  });
};