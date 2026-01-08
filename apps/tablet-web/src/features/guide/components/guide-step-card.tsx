'use client';

import type { ReactNode } from 'react';
import { Badge, Card, CardContent, cn } from '@repo/ui';

interface Props {
  stepNumber: number;
  icon: ReactNode;
  title: string;
  description: string;
  isActive?: boolean;
}

export function GuideStepCard({ stepNumber, icon, title, description, isActive = false }: Props) {
  return (
    <Card
      className={cn(
        'h-full border-2 transition-all duration-200',
        isActive ? 'border-primary shadow-lg' : 'border-border'
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-6 p-8 text-center">
        <Badge variant="default" className="text-sm font-semibold">
          STEP {stepNumber}
        </Badge>

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
          <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
