import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit') || '12';
  const index = parseInt(searchParams.get('index') || '0');

  try {
    // Using Top Worldwide playlist (ID: 3155776842)
    // This is more reliable than chart/0/tracks
    const response = await fetch(
      `https://api.deezer.com/playlist/3155776842`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }

    const data = await response.json();

    debugger;
    
    // Extract tracks and implement pagination manually
    const allTracks = data.tracks?.data || [];
    const limitNum = parseInt(limit);
    const paginatedTracks = allTracks.slice(index, index + limitNum);
    
    return NextResponse.json({
      data: paginatedTracks,
      total: allTracks.length,
    });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks' },
      { status: 500 }
    );
  }
}