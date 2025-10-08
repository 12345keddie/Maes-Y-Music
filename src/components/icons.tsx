import { Music4 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NeonBeatLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-primary',
        className
      )}
    >
      <Music4 className="h-6 w-6" />
      <h1 className="text-2xl font-bold font-headline tracking-wider">
        Maes Y Music
      </h1>
    </div>
  );
}
