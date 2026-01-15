'use client';

import { useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@repo/ui';
import { cn } from '@repo/ui';

interface Props {
  className?: string;
}

export function ScrollToTopButton({ className }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    // Find scrollable parent and scroll to top
    let element = buttonRef.current?.parentElement;
    while (element) {
      if (element.scrollHeight > element.clientHeight) {
        element.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      element = element.parentElement;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      ref={buttonRef}
      variant="default"
      size="icon-lg"
      onClick={scrollToTop}
      className={cn('fixed bottom-6 right-6 z-40 rounded-full shadow-lg', className)}
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-5" />
    </Button>
  );
}
