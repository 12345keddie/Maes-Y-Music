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
      '/Wiz Khalifa, Ty Dolla $ign, Lil Yachty & Sueco the Child - Speed Me Up [Video].mp4',
  },
  {
    id: 'kid-cudi-stars-in-the-sky',
    title: 'Stars In The Sky',
    artist: 'Kid Cudi',
    thumbnailUrl: 'https://i.ytimg.com/vi/efiLdiBk1f8/sddefault.jpg',
    videoUrl: '/Kid Cudi - Stars In The Sky.mp4',
  },
  {
    id: 'jelly-roll-run-it',
    title: 'Run It (From Sonic The Hedgehog 3)',
    artist: 'Jelly Roll',
    thumbnailUrl:
      'https://i.ytimg.com/vi/3aSxdwwT62M/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWyhJMA8=&rs=AOn4CLBffrKX2e-T3VLzbjpAVHvzWQTZsg',
    videoUrl:
      '/Jelly Roll - Run It (From Sonic The Hedgehog 3) [Official Music Video].mp4',
  },
];
