import type { ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@repo/ui';
import { Heart, Settings, ShoppingCart, Sparkles, Star } from 'lucide-react';
import { SectionHeader } from './shared';

export function CardsSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Cards"
        description="Versatile containers for grouping and displaying content."
        icon={<ShoppingCart className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Basic Card</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>A brief description of what this card represents.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the main content area. You can place any content here.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>With Action</CardTitle>
                <CardDescription>Card with action button in header.</CardDescription>
                <CardAction>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The CardAction component positions a button in the top-right corner.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats Card</CardTitle>
                <CardDescription>Display metrics and statistics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-1 text-4xl font-bold text-primary">2,847</div>
                <p className="text-sm text-muted-foreground">Total visitors this month</p>
                <div className="mt-2 flex items-center gap-1">
                  <Badge variant="complete">+12.5%</Badge>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Game Card Example</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Catan</CardTitle>
                  <Badge variant="complete">Available</Badge>
                </div>
                <CardDescription>Classic strategy board game</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">3-4 Players</Badge>
                  <Badge variant="secondary">60-120 min</Badge>
                  <Badge variant="outline">Medium</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Request Game
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-status-warning/20 to-status-warning/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-status-warning/20">
                  <Star className="h-8 w-8 text-status-warning" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Ticket to Ride</CardTitle>
                  <Badge variant="warning">1 Left</Badge>
                </div>
                <CardDescription>Cross-country train adventure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">2-5 Players</Badge>
                  <Badge variant="secondary">30-60 min</Badge>
                  <Badge variant="outline">Easy</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Request Game
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden opacity-75">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted-foreground/10">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Wingspan</CardTitle>
                  <Badge variant="error">Unavailable</Badge>
                </div>
                <CardDescription>Bird-themed engine builder</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">1-5 Players</Badge>
                  <Badge variant="secondary">40-70 min</Badge>
                  <Badge variant="outline">Medium</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  Currently Unavailable
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Table Status Cards</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-muted-foreground/30">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Table 1</CardTitle>
                  <Badge variant="secondary">Empty</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">2-4 Players • Ready</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-status-progress">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Table 2</CardTitle>
                  <Badge variant="progress">Occupied</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">3 Players • 45 min left</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-status-warning">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Table 3</CardTitle>
                  <Badge variant="warning">Ending Soon</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">4 Players • 8 min left</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-status-error">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Table 4</CardTitle>
                  <Badge variant="error">Overtime</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">2 Players • +5 min over</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
