import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const updates = [
  {
    version: 'v1.2.1',
    title: 'Tenby Update',
    date: 'October 2025',
    description:
      "Just a tiny update while I'm away for the week. I've added a community poll to decide if K-Pop Demon Hunters songs should be added. The poll will last until Halloween!",
  },
  {
    version: 'v1.2.0',
    title: 'Real-Time Community Polls',
    date: 'October 2025',
    description:
      'Added a real-time community poll feature. Users can now vote on what content should be added next, with results updating live across all devices.',
  },
  {
    version: 'v1.1.0',
    title: 'Fullscreen Video Player',
    date: 'October 2025',
    description:
      'The video player now supports fullscreen mode for a more immersive viewing experience.',
  },
  {
    version: 'v1.0.0',
    title: 'Initial Release',
    date: 'October 2025',
    description:
      'The initial launch of Maes Y Music, featuring a curated list of music videos, a dynamic playlist, and a sleek, modern interface.',
  },
];

export default function UpdatesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 h-full overflow-y-auto">
      <h1 className="text-4xl font-headline font-bold text-primary mb-2">
        What's New
      </h1>
      <p className="text-muted-foreground mb-8">
        Check out the latest features and updates for Maes Y Music.
      </p>

      <div className="space-y-8">
        {updates.map((update) => (
          <Card key={update.version}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="font-headline text-2xl">{update.title}</span>
                <span className="text-sm font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {update.version}
                </span>
              </CardTitle>
              <CardDescription>{update.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                <p className="text-foreground/90">{update.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
