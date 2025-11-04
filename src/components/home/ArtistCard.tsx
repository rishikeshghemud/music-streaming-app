import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Artist } from '@/types/music';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
      <CardContent className="p-4">
        <img 
          src={artist.picture_medium} 
          alt={artist.name} 
          className="w-full aspect-square object-cover rounded-full mb-3" 
        />
        <h3 className="font-semibold text-sm text-center truncate">
          {artist.name}
        </h3>
        <p className="text-xs text-muted-foreground text-center">
          {artist.nb_fan?.toLocaleString()} fans
        </p>
      </CardContent>
    </Card>
  );
};