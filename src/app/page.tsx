import { NeonBeatPlayer } from '@/components/neon-beat-player';
import { videos } from '@/lib/videos';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <NeonBeatPlayer allVideos={videos} />
    </main>
  );
}
