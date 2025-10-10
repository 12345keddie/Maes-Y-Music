'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NeonBeatLogo } from './icons';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function AppHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/updates', label: 'Updates' },
  ];

  return (
    <header className="flex-shrink-0 p-4 border-b border-primary/10 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <NeonBeatLogo />
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                'text-muted-foreground hover:text-primary hover:bg-primary/10',
                pathname === link.href && 'text-primary bg-primary/10'
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
