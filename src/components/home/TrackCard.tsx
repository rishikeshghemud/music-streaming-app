import React from 'react';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Track } from '@/types/music';
import { formatDuration } from '@/lib/utils';

interface TrackCardProps {
  track: Track;
  onClick: () => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, onClick }) => {
  return (
    <Card 
      className="group cursor-pointer transition-all hover:shadow-lg hover:scale-105" 
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img 
            src={track.album.cover_medium} 
            alt={track.title} 
            className="w-full aspect-square object-cover rounded-lg" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Play className="w-12 h-12 text-white" fill="white" />
          </div>
        </div>
        <h3 className="font-semibold text-sm truncate mb-1">{track.title}</h3>
        <p className="text-sm text-muted-foreground truncate mb-2">
          {track.artist.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDuration(track.duration)}
        </p>
      </CardContent>
    </Card>
  );
};