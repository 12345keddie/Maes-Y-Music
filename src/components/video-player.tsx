'use client';

import type { Video } from '@/lib/videos';
import {
  useRef,
  useState,
  useEffect,
  type MouseEvent,
  useCallback,
} from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Volume1,
  Music4,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type VideoPlayerProps = {
  video: Video | null;
  onEnded: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function VideoPlayer({
  video,
  onEnded,
  onNext,
  onPrevious,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current && video) {
      videoRef.current.volume = volume;
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [video, volume]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (values: number[]) => {
    if (videoRef.current) {
      const newTime = values[0];
      videoRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const VolumeIcon = useCallback(() => {
    if (volume === 0) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  }, [volume]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl shadow-primary/10 group">
      <video
        ref={videoRef}
        src={video?.videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        className="w-full h-full object-contain"
      />

      {!video && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/30 text-muted-foreground p-8 text-center">
          <Music4 className="w-16 h-16 mb-4 text-primary/50" />
          <h3 className="font-headline text-2xl text-foreground">
            Welcome to Maes Y Music
          </h3>
          <p>Select a video from the browser or add to your playlist to begin.</p>
        </div>
      )}

      {video && (
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300',
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          )}
        >
          <div className="absolute top-4 left-4 right-4 text-white p-2 rounded-md bg-black/20 backdrop-blur-sm">
            <h3 className="font-headline text-xl truncate">{video.title}</h3>
            <p className="text-sm text-primary/80 truncate">{video.artist}</p>
          </div>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="w-24 h-24 text-white hover:bg-white/10"
              >
                <Play className="w-16 h-16 fill-current" />
              </Button>
            </div>
          )}

          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-white text-xs">
              <span>{formatTime(progress)}</span>
              <Slider
                value={[progress]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span>{formatTime(duration)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  className="text-white hover:text-primary"
                >
                  <SkipBack />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white hover:text-primary"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  className="text-white hover:text-primary"
                >
                  <SkipForward />
                </Button>
              </div>
              <div className="flex items-center gap-2 w-32">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary"
                  onClick={() => handleVolumeChange([volume > 0 ? 0 : 0.8])}
                >
                  <VolumeIcon />
                </Button>
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.05}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
