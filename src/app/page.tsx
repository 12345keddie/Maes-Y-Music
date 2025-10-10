import { NeonBeatPlayer } from '@/components/neon-beat-player';
import { Poll } from '@/components/poll';
import { FirebaseClientProvider } from '@/firebase';
import { videos } from '@/lib/videos';

export default function Home() {
  return (
    <FirebaseClientProvider>
      <main className="bg-background min-h-screen text-foreground">
        <NeonBeatPlayer allVideos={videos} />
        <Poll />
      </main>
    </FirebaseClientProvider>
  );
}
