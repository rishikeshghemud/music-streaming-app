import { NextRequest, NextResponse } from 'next/server';

// Popular Deezer playlist IDs
const PLAYLISTS = {
  worldwide: '3155776842',      // Top Worldwide
  usa: '1313621735',            // Top USA
  uk: '1266970651',             // Top UK
  pop: '1282483245',            // Top Pop
  rock: '1282483265',           // Top Rock
  hiphop: '1282483305',         // Top Hip Hop
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const playlistType = searchParams.get('type') || 'worldwide';
  const limit = searchParams.get('limit') || '50';

  try {
    const playlistId = PLAYLISTS[playlistType as keyof typeof PLAYLISTS] || PLAYLISTS.worldwide;
    
    const response = await fetch(
      `https://api.deezer.com/playlist/${playlistId}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const data = await response.json();
    const tracks = data.tracks?.data || [];
    
    return NextResponse.json({
      data: tracks.slice(0, parseInt(limit)),
      total: tracks.length,
      playlist: {
        id: data.id,
        title: data.title,
        description: data.description,
      }
    });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlist' },
      { status: 500 }
    );
  }
}