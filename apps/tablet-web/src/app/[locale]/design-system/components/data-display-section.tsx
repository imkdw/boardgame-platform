import type { ReactNode } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Progress,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui';
import { Table2 } from 'lucide-react';
import { SectionHeader } from './shared';

const gameData = [
  { name: 'Catan', players: '3-4', duration: '60-120 min', status: 'complete' as const },
  { name: 'Ticket to Ride', players: '2-5', duration: '30-60 min', status: 'progress' as const },
  { name: 'Wingspan', players: '1-5', duration: '40-70 min', status: 'error' as const },
  { name: 'Azul', players: '2-4', duration: '30-45 min', status: 'warning' as const },
  { name: 'Codenames', players: '4-8', duration: '15-30 min', status: 'new' as const },
];

const statusLabels: Record<string, string> = {
  complete: 'Available',
  progress: 'In Use',
  error: 'Unavailable',
  warning: 'Low Stock',
  new: 'New Arrival',
};

export function DataDisplaySection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Data Display"
        description="Components for presenting structured data, user identities, and loading states."
        icon={<Table2 className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tables</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameData.map(game => (
                  <TableRow key={game.name}>
                    <TableCell className="font-medium">{game.name}</TableCell>
                    <TableCell>{game.players}</TableCell>
                    <TableCell>{game.duration}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={game.status}>{statusLabels[game.status]}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Avatar</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="Small avatar" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka" alt="Default avatar" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Chester" alt="Large avatar" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Large</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Bubba" alt="Extra large avatar" />
                  <AvatarFallback>XL</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Extra Large</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Initials</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-status-complete text-white">OK</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Custom Color</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Separators</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-medium text-foreground">Horizontal Separator</p>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Content above the separator</p>
                  <Separator />
                  <p className="text-sm text-muted-foreground">Content below the separator</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-foreground">Vertical Separator</p>
                <div className="flex h-10 items-center gap-4">
                  <span className="text-sm text-muted-foreground">Games</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm text-muted-foreground">Tables</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm text-muted-foreground">Orders</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm text-muted-foreground">Settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Loading States</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-border bg-card p-8 shadow-sm">
              <p className="text-sm font-medium text-foreground">Skeleton</p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Line skeleton</p>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Avatar skeleton</p>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Card skeleton</p>
                  <div className="space-y-3 rounded-lg border border-border p-4">
                    <Skeleton className="h-32 w-full rounded-md" />
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-border bg-card p-8 shadow-sm">
              <p className="text-sm font-medium text-foreground">Progress</p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">0%</span>
                    <span className="text-xs font-medium text-foreground">Not Started</span>
                  </div>
                  <Progress value={0} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">25%</span>
                    <span className="text-xs font-medium text-foreground">Getting Started</span>
                  </div>
                  <Progress value={25} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">50%</span>
                    <span className="text-xs font-medium text-foreground">Halfway There</span>
                  </div>
                  <Progress value={50} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">75%</span>
                    <span className="text-xs font-medium text-foreground">Almost Done</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">100%</span>
                    <span className="text-xs font-medium text-foreground">Complete!</span>
                  </div>
                  <Progress value={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
