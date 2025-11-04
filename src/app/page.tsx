'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '@/components/Layout/Header';
import { MusicPlayer } from '@/components/Layout/MusicPlayer';
import { TrackCard } from '@/components/home/TrackCard';
import { ArtistCard } from '@/components/home/ArtistCard';
import { AlbumCard } from '@/components/home/AlbumCard';
import { SkeletonCard } from '@/components/home/SkeletonCard';
import { useTrendingTracks, useTopArtists, useNewReleases } from '@/lib/hooks/useMusic';
import { setCurrentTrack, setQueue } from '@/lib/store/slices/playerSlice';
import { Track } from '@/types/music';

export default function Home() {
  const dispatch = useDispatch();
  
  const {
    data: tracksData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: tracksLoading,
  } = useTrendingTracks();

  const { data: artists, isLoading: artistsLoading } = useTopArtists();
  const { data: albums, isLoading: albumsLoading } = useNewReleases();

  const allTracks = tracksData?.pages.flatMap((page) => page.tracks) || [];

  const handleTrackClick = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(allTracks));
  };

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 500 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Trending Songs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Trending Songs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tracksLoading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : allTracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    onClick={() => handleTrackClick(track)}
                  />
                ))}
          </div>
          {isFetchingNextPage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}
        </section>

        {/* Popular Artists Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Popular Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {artistsLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : artists?.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">New Releases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albumsLoading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : albums?.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
          </div>
        </section>
      </main>

      <MusicPlayer />
    </div>
  );
}