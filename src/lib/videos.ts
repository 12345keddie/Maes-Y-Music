import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Video = {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
  videoUrl: string;
};

const getThumbnail = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id)?.imageUrl ||
  'https://placehold.co/400x225/121212/64B5F6?text=NeonBeat';

export const videos: Video[] = [
  {
    id: 'vid1',
    title: 'Cosmic Drift',
    artist: 'Galaxy Runners',
    thumbnailUrl: getThumbnail('video-thumb-1'),
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'vid2',
    title: 'Midnight Drive',
    artist: 'Night Crawlers',
    thumbnailUrl: getThumbnail('video-thumb-2'),
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'vid3',
    title: 'Neon Bloom',
    artist: 'Cyberflora',
    thumbnailUrl: getThumbnail('video-thumb-3'),
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 'vid4',
    title: 'Starlight Echoes',
    artist: 'Astro Beats',
    thumbnailUrl: getThumbnail('video-thumb-4'),
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'vid5',
    title: 'City Lights',
    artist: 'Urban Pulse',
    thumbnailUrl: getThumbnail('video-thumb-5'),
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'vid6',
    title: 'Quantum Leap',
    artist: 'Dimension Drifters',
    thumbnailUrl: getThumbnail('video-thumb-6'),
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
];
