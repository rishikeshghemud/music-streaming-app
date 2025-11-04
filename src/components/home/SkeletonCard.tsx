import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCard: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="w-full aspect-square rounded-lg mb-3" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  );
};