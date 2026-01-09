'use client';

import { cn } from '@repo/ui';

interface Props {
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ totalSteps, currentStep, onStepClick }: Props) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: totalSteps }, (_, index) => {
        const isActive = index === currentStep;
        const stepIndex = index;

        return (
          <button
            key={stepIndex}
            type="button"
            onClick={() => onStepClick?.(stepIndex)}
            disabled={!onStepClick}
            aria-label={`Go to step ${stepIndex + 1}`}
            aria-current={isActive ? 'step' : undefined}
            className={cn(
              'h-3 w-3 rounded-full transition-all duration-200',
              isActive ? 'scale-125 bg-primary' : 'bg-muted hover:bg-muted-foreground/50',
              onStepClick && 'cursor-pointer'
            )}
          />
        );
      })}
    </div>
  );
}
