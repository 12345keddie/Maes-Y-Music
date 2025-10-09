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
  'https://placehold.co/400x225/121212/64B5F6?text=Maes+Y+Music';

export const videos: Video[] = [
  {
    id: 'rick-astley',
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: '/Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster).mp4',
  },
];
