'use client';

import type { Video } from '@/lib/videos';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { PlayCircle, PlusCircle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

type VideoBrowserProps = {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  onAddToPlaylist: (video: Video) => void;
};

export function VideoBrowser({
  videos,
  onSelectVideo,
  onAddToPlaylist,
}: VideoBrowserProps) {
  return (
    <ScrollArea className="h-full px-4">
      <div className="grid grid-cols-1 gap-4 pb-4">
        {videos.map((video) => (
          <Card
            key={video.id}
            className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
          >
            <CardContent className="p-0">
              <div className="flex">
                <button
                  onClick={() => onSelectVideo(video)}
                  className="relative w-1/3 aspect-video overflow-hidden group/thumb bg-black"
                  aria-label={`Play ${video.title}`}
                >
                  <Image
                    src={video.thumbnailUrl}
                    alt={`Thumbnail for ${video.title}`}
                    width={160}
                    height={90}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover/thumb:scale-110"
                    data-ai-hint="neon lights"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </button>
                <div className="p-4 flex-1">
                  <CardTitle className="font-headline text-lg leading-tight">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {video.artist}
                  </CardDescription>
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddToPlaylist(video)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add to Playlist
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
