'use client';

import type { ReactNode } from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@repo/ui';
import { toast } from 'sonner';
import { Bell, Info, AlertCircle, CheckCircle2, AlertTriangle, Clock, Sparkles, XCircle } from 'lucide-react';
import { SectionHeader } from './shared';

export function FeedbackSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Feedback"
        description="Components for communicating status, alerts, and notifications to users."
        icon={<Bell className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Alerts</h3>
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <Alert variant="default">
              <Info className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a default alert for general information.</AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Destructive Alert</AlertTitle>
              <AlertDescription>This action is destructive and cannot be undone.</AlertDescription>
            </Alert>

            <Alert variant="progress">
              <Clock className="h-4 w-4" />
              <AlertTitle>In Progress</AlertTitle>
              <AlertDescription>Your game session is currently being set up.</AlertDescription>
            </Alert>

            <Alert variant="complete">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Complete</AlertTitle>
              <AlertDescription>Game has been successfully added to your collection.</AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Low inventory alert: Only 3 copies remaining.</AlertDescription>
            </Alert>

            <Alert variant="error">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
            </Alert>

            <Alert variant="new">
              <Sparkles className="h-4 w-4" />
              <AlertTitle>New Feature</AlertTitle>
              <AlertDescription>Check out our new game recommendation system!</AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tooltips</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <TooltipProvider>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a helpful tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">
                      <Info className="mr-2 h-4 w-4" />
                      Info Button
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for more information</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View notifications</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Toast Notifications</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => toast.success('Game added to your collection!')}>Success Toast</Button>
              <Button variant="destructive" onClick={() => toast.error('Failed to delete game.')}>
                Error Toast
              </Button>
              <Button variant="secondary" onClick={() => toast.warning('Your session will expire in 5 minutes.')}>
                Warning Toast
              </Button>
              <Button variant="outline" onClick={() => toast.info('New games are available in the catalog.')}>
                Info Toast
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
