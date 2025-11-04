import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Album } from '@/types/music';

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
      <CardContent className="p-4">
        <img 
          src={album.cover_medium} 
          alt={album.title} 
          className="w-full aspect-square object-cover rounded-lg mb-3" 
        />
        <h3 className="font-semibold text-sm truncate">{album.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {album.artist.name}
        </p>
      </CardContent>
    </Card>
  );
};