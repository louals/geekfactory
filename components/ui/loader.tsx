'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: number;
}

export function Loader({ className, size = 24 }: LoaderProps) {
  return (
    <Loader2
      className={cn('animate-spin text-bismuth-cyan', className)}
      size={size}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader className="h-10 w-10 text-bismuth-magenta" />
    </div>
  );
}
