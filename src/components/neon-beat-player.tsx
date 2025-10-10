'use client';

import type { Video } from '@/lib/videos';
import { useState } from 'react';
import { VideoPlayer } from './video-player';
import { VideoBrowser } from './video-browser';
import { Playlist } from './playlist';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Film, ListMusic } from 'lucide-react';

type NeonBeatPlayerProps = {
  allVideos: Video[];
};

export function NeonBeatPlayer({ allVideos }: NeonBeatPlayerProps) {
  const [playlist, setPlaylist] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);
  const { toast } = useToast();

  const currentVideo =
    currentVideoIndex >= 0 ? playlist[currentVideoIndex] : null;

  const handleSelectVideo = (video: Video) => {
    const indexInPlaylist = playlist.findIndex((v) => v.id === video.id);
    if (indexInPlaylist !== -1) {
      setCurrentVideoIndex(indexInPlaylist);
    } else {
      const newPlaylist = [...playlist, video];
      setPlaylist(newPlaylist);
      setCurrentVideoIndex(newPlaylist.length - 1);
    }
  };

  const handleAddToPlaylist = (video: Video) => {
    if (playlist.some((v) => v.id === video.id)) {
      toast({
        title: 'Already in Playlist',
        description: `"${video.title}" is already in your playlist.`,
      });
    } else {
      setPlaylist([...playlist, video]);
      toast({
        title: 'Added to Playlist',
        description: `"${video.title}" has been added to your playlist.`,
      });
    }
  };

  const handleRemoveFromPlaylist = (videoId: string) => {
    const videoToRemove = playlist.find((v) => v.id === videoId);
    if (!videoToRemove) return;

    const newPlaylist = playlist.filter((v) => v.id !== videoId);
    const oldIndex = playlist.findIndex((v) => v.id === videoId);

    if (newPlaylist.length === 0) {
      setPlaylist([]);
      setCurrentVideoIndex(-1);
    } else {
      if (oldIndex < currentVideoIndex) {
        setCurrentVideoIndex(currentVideoIndex - 1);
      } else if (oldIndex === currentVideoIndex) {
        // If removing the current video, play the next one or stop if it's the last.
        if (currentVideoIndex >= newPlaylist.length) {
          setCurrentVideoIndex(0); // Loop to start
        }
        // The index stays the same, but the video at that index is new
      }
      setPlaylist(newPlaylist);
    }
    toast({
      title: 'Removed from Playlist',
      description: `"${videoToRemove.title}" has been removed.`,
    });
  };

  const handlePlayFromPlaylist = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrevious = () => {
    if (playlist.length === 0) return;
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="grid flex-grow grid-cols-1 gap-4 overflow-hidden p-4 md:gap-8 md:p-8 lg:grid-cols-3">
        <div className="flex min-h-0 flex-col items-center justify-center lg:col-span-2">
          <VideoPlayer
            video={currentVideo}
            onEnded={handleNext}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>

        <aside className="border-card/50 flex flex-col overflow-hidden rounded-lg border bg-card/50 lg:col-span-1">
          <Tabs defaultValue="browse" className="flex h-full flex-col">
            <TabsList className="m-2 grid w-full grid-cols-2">
              <TabsTrigger value="browse">
                <Film className="mr-2 h-4 w-4" />
                Browse
              </TabsTrigger>
              <TabsTrigger value="playlist">
                <ListMusic className="mr-2 h-4 w-4" />
                Playlist
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="browse"
              className="mt-0 flex-grow overflow-y-auto"
            >
              <VideoBrowser
                videos={allVideos}
                onSelectVideo={handleSelectVideo}
                onAddToPlaylist={handleAddToPlaylist}
              />
            </TabsContent>
            <TabsContent
              value="playlist"
              className="mt-0 flex-grow overflow-y-auto"
            >
              <Playlist
                playlist={playlist}
                currentVideoId={currentVideo?.id}
                onSelectVideo={handlePlayFromPlaylist}
                onRemoveFromPlaylist={handleRemoveFromPlaylist}
              />
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  );
}
