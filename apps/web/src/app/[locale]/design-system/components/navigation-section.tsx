import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  ScrollArea,
  ScrollBar,
} from '@repo/ui';
import { Navigation } from 'lucide-react';
import { SectionHeader } from './shared';

export function NavigationSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Navigation"
        description="Components for organizing content and guiding users through information."
        icon={<Navigation className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Accordions</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="mb-4 text-xs font-medium text-muted-foreground">Single Collapsible (FAQ)</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I request a game?</AccordionTrigger>
                  <AccordionContent>
                    Browse our game collection using the tablet at your table. Tap "Request Game" on any available
                    title, and our staff will bring it to you within 5 minutes. You can also ask staff directly for
                    recommendations!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the session duration?</AccordionTrigger>
                  <AccordionContent>
                    Standard sessions are 2 hours. We also offer 1-hour quick plays and 3-hour extended sessions. Your
                    remaining time is always visible on the tablet screen.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How can I extend my time?</AccordionTrigger>
                  <AccordionContent>
                    Tap "Extend Session" on your tablet or ask our staff. Extensions are available in 30-minute
                    increments, subject to availability. You'll receive a notification when 15 minutes remain.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="mb-4 text-xs font-medium text-muted-foreground">Multiple Expand (Rules)</p>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="setup">
                  <AccordionTrigger>Game Setup</AccordionTrigger>
                  <AccordionContent>
                    Place the game board in the center of the table. Each player chooses a color and takes the matching
                    pieces. Shuffle the resource cards and deal 5 to each player. The youngest player goes first.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="turns">
                  <AccordionTrigger>Taking Turns</AccordionTrigger>
                  <AccordionContent>
                    On your turn: 1) Roll the dice, 2) Move your piece, 3) Perform the action on your space, 4) Draw a
                    card if instructed. Play then passes clockwise to the next player.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="winning">
                  <AccordionTrigger>Winning Conditions</AccordionTrigger>
                  <AccordionContent>
                    The first player to reach 10 victory points wins. Points are earned by completing objectives,
                    building settlements, and collecting special achievement cards.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pagination</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground">Basic Pagination</p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground">With Ellipsis (Game Catalog)</p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">10</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Scroll Areas</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="mb-4 text-xs font-medium text-muted-foreground">Vertical Scroll (Available Games)</p>
              <ScrollArea className="h-72 w-full rounded-lg border">
                <div className="p-4">
                  {[
                    { name: 'Catan', players: '3-4', time: '60-120 min' },
                    { name: 'Ticket to Ride', players: '2-5', time: '30-60 min' },
                    { name: 'Pandemic', players: '2-4', time: '45 min' },
                    { name: 'Azul', players: '2-4', time: '30-45 min' },
                    { name: '7 Wonders', players: '3-7', time: '30 min' },
                    { name: 'Splendor', players: '2-4', time: '30 min' },
                    { name: 'Codenames', players: '2-8+', time: '15 min' },
                    { name: 'Dixit', players: '3-6', time: '30 min' },
                    { name: 'Wingspan', players: '1-5', time: '40-70 min' },
                    { name: 'Terraforming Mars', players: '1-5', time: '120 min' },
                    { name: 'Scythe', players: '1-5', time: '90-115 min' },
                    { name: 'Root', players: '2-4', time: '60-90 min' },
                  ].map((game, index) => (
                    <div
                      key={game.name}
                      className={`flex items-center justify-between py-3 ${index !== 0 ? 'border-t border-border' : ''}`}
                    >
                      <div>
                        <p className="font-medium text-foreground">{game.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {game.players} players • {game.time}
                        </p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-status-complete" title="Available" />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="mb-4 text-xs font-medium text-muted-foreground">Horizontal Scroll (Quick Rules)</p>
              <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
                <div className="flex w-max space-x-4 p-4">
                  {[
                    { step: '1', title: 'Setup', desc: 'Place board and shuffle cards' },
                    { step: '2', title: 'Deal', desc: 'Give 5 cards to each player' },
                    { step: '3', title: 'Roll', desc: 'Roll dice on your turn' },
                    { step: '4', title: 'Move', desc: 'Move your piece accordingly' },
                    { step: '5', title: 'Action', desc: 'Perform the space action' },
                    { step: '6', title: 'Draw', desc: 'Draw card if required' },
                    { step: '7', title: 'Pass', desc: 'Next player clockwise' },
                    { step: '8', title: 'Win', desc: 'First to 10 points wins!' },
                  ].map(rule => (
                    <div
                      key={rule.step}
                      className="flex w-40 shrink-0 flex-col rounded-lg border border-border bg-muted/30 p-4"
                    >
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {rule.step}
                      </div>
                      <p className="font-medium text-foreground">{rule.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{rule.desc}</p>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
