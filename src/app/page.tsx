import { NeonBeatPlayer } from '@/components/neon-beat-player';
import { Poll } from '@/components/poll';
import { videos } from '@/lib/videos';

export default function Home() {
  return (
    <>
      <NeonBeatPlayer allVideos={videos} />
      <Poll />
    </>
  );
}
