import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit') || '12';

  try {
    // Using Top Albums playlist approach
    // Get trending tracks and extract unique albums
    const response = await fetch(
      `https://api.deezer.com/playlist/3155776842`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }

    const data = await response.json();
    const tracks = data.tracks?.data || [];
    
    // Extract unique albums from tracks
    const albumMap = new Map();
    tracks.forEach((track: any) => {
      if (track.album && !albumMap.has(track.album.id)) {
        albumMap.set(track.album.id, {
          id: track.album.id,
          title: track.album.title,
          cover: track.album.cover,
          cover_small: track.album.cover_small,
          cover_medium: track.album.cover_medium,
          cover_big: track.album.cover_big,
          cover_xl: track.album.cover_xl,
          md5_image: track.album.md5_image,
          tracklist: track.album.tracklist,
          type: track.album.type,
          artist: track.artist,
        });
      }
    });

    const albums = Array.from(albumMap.values()).slice(0, parseInt(limit));
    
    return NextResponse.json({ data: albums });
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}   