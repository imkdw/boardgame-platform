import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
        progress:
          'border-status-progress/50 bg-status-progress/10 text-status-progress [&>svg]:text-status-progress *:data-[slot=alert-description]:text-status-progress/90',
        complete:
          'border-status-complete/50 bg-status-complete/10 text-status-complete [&>svg]:text-status-complete *:data-[slot=alert-description]:text-status-complete/90',
        warning:
          'border-status-warning/50 bg-status-warning/10 text-status-warning [&>svg]:text-status-warning *:data-[slot=alert-description]:text-status-warning/90',
        error:
          'border-status-error/50 bg-status-error/10 text-status-error [&>svg]:text-status-error *:data-[slot=alert-description]:text-status-error/90',
        new: 'border-status-new/50 bg-status-new/10 text-status-new [&>svg]:text-status-new *:data-[slot=alert-description]:text-status-new/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
