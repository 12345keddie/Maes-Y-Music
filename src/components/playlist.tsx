'use client';

import type { Video } from '@/lib/videos';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { GripVertical, Music, XCircle } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type PlaylistProps = {
  playlist: Video[];
  currentVideoId: string | null;
  onSelectVideo: (index: number) => void;
  onRemoveFromPlaylist: (videoId: string) => void;
};

export function Playlist({
  playlist,
  currentVideoId,
  onSelectVideo,
  onRemoveFromPlaylist,
}: PlaylistProps) {
  if (playlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <Music className="w-12 h-12 mb-4" />
        <h3 className="font-headline text-lg text-foreground">
          Your Playlist is Empty
        </h3>
        <p>Add videos from the 'Browse' tab to get started.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col p-2">
        {playlist.map((video, index) => {
          const isPlaying = video.id === currentVideoId;
          return (
            <div
              key={video.id}
              className={cn(
                'group flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-primary/10',
                isPlaying && 'bg-primary/20'
              )}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground shrink-0" />
              <button
                onClick={() => onSelectVideo(index)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  width={80}
                  height={45}
                  className="rounded object-cover aspect-video"
                  data-ai-hint="neon lights"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'truncate font-medium',
                      isPlaying ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {video.title}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {video.artist}
                  </p>
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-50 group-hover:opacity-100"
                onClick={() => onRemoveFromPlaylist(video.id)}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
