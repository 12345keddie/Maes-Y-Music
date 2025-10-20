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
  {
    id: 'ksi-thick-of-it',
    title: 'Thick Of It (feat. Trippie Redd)',
    artist: 'KSI',
    thumbnailUrl: 'https://i.ytimg.com/vi/At8v_Yc044Y/maxresdefault.jpg',
    videoUrl: '/KSI - Thick Of It (feat. Trippie Redd) [Official Music Video].mp4',
  },
  {
    id: 'sonic-speed-me-up',
    title: 'Speed Me Up',
    artist: 'Wiz Khalifa, Ty Dolla $ign, Lil Yachty & Sueco the Child',
    thumbnailUrl: 'https://i.ytimg.com/vi/dCuCpVPkWDY/maxresdefault.jpg',
    videoUrl:
      '/Wiz Khalifa, Ty Dolla $ign, Lil Yachty & Sueco the Child - Speed Me Up (Sonic The Hedgehog) [Video].mp4',
  },
  {
    id: 'jelly-roll-run-it',
    title: 'Run It',
    artist: 'Jelly Roll',
    thumbnailUrl:
      'https://cdn.sanity.io/images/o6uq28nb/production/5b214e8cfd60ccc537c6e2684855e771fcaa22d0-640x640.jpg?w=1200&h=630&fit=crop&crop=bottom',
    videoUrl:
      '/Jelly Roll - Run It (From Sonic The Hedgehog 3) [Official Music Video].mp4',
  },
];
