import type { ReactNode } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@repo/ui';
import { Layers, Search } from 'lucide-react';
import { SectionHeader } from './shared';

export function TabsSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Tabs"
        description="Organize content into separate views within the same context."
        icon={<Layers className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Basic Tabs</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="rounded-lg border p-4">
                <h4 className="font-medium">Overview</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  This is the overview tab content. It provides a general summary of the information.
                </p>
              </TabsContent>
              <TabsContent value="features" className="rounded-lg border p-4">
                <h4 className="font-medium">Features</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  This tab displays the features and capabilities available.
                </p>
              </TabsContent>
              <TabsContent value="settings" className="rounded-lg border p-4">
                <h4 className="font-medium">Settings</h4>
                <p className="mt-2 text-sm text-muted-foreground">Configure your preferences and settings here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tablet Navigation Example
          </h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="store">Store Info</TabsTrigger>
                <TabsTrigger value="guide">Usage Guide</TabsTrigger>
                <TabsTrigger value="games">Game Search</TabsTrigger>
                <TabsTrigger value="myinfo">My Session</TabsTrigger>
              </TabsList>
              <TabsContent value="store" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>Welcome to our board game cafe!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Store details and information would appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="guide" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How to Use</CardTitle>
                    <CardDescription>Quick guide for using our services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Usage instructions would appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="games" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Find Games</CardTitle>
                    <CardDescription>Search and browse our game collection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search for games..." />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="myinfo" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Session</CardTitle>
                    <CardDescription>Current session information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Time Remaining</span>
                        <Badge variant="progress">45:00</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Table</span>
                        <span className="text-sm font-medium">Table 3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
