'use client';

import type { ReactNode } from 'react';
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Label,
  Switch,
  Checkbox,
} from '@repo/ui';
import {
  Layers,
  Filter,
  SlidersHorizontal,
  Settings,
  User,
  LogOut,
  CreditCard,
  Gamepad2,
  Clock,
  Users,
  Star,
  Dice5,
  ChevronDown,
} from 'lucide-react';
import { SectionHeader } from './shared';

export function OverlaysSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Overlays"
        description="Floating panels, menus, and command palettes for contextual interactions."
        icon={<Layers className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Side Sheets</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter Games
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filter Games</SheetTitle>
                    <SheetDescription>Narrow down your game search with these options.</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-6 py-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Player Count</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="players-2" />
                          <label htmlFor="players-2" className="text-sm">
                            2 Players
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="players-3-4" />
                          <label htmlFor="players-3-4" className="text-sm">
                            3-4 Players
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="players-5-plus" />
                          <label htmlFor="players-5-plus" className="text-sm">
                            5+ Players
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Play Time</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="time-30" />
                          <label htmlFor="time-30" className="text-sm">
                            Under 30 minutes
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="time-60" />
                          <label htmlFor="time-60" className="text-sm">
                            30-60 minutes
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="time-60-plus" />
                          <label htmlFor="time-60-plus" className="text-sm">
                            60+ minutes
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available-only">Available only</Label>
                      <Switch id="available-only" />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button variant="outline">Reset</Button>
                    <Button>Apply Filters</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button>
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Session Details
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh]">
                  <SheetHeader>
                    <SheetTitle>Current Session</SheetTitle>
                    <SheetDescription>Your active gaming session at Table 5</SheetDescription>
                  </SheetHeader>
                  <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time Elapsed</p>
                        <p className="text-lg font-semibold">1:45:32</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Party Size</p>
                        <p className="text-lg font-semibold">4 Players</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Gamepad2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Current Game</p>
                        <p className="text-lg font-semibold">Catan</p>
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button variant="outline">Request Game</Button>
                    <Button variant="destructive">End Session</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Popovers</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Quick Settings
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Settings</h4>
                      <p className="text-sm text-muted-foreground">Adjust your preferences quickly.</p>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications" className="text-sm">
                          Notifications
                        </Label>
                        <Switch id="notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound" className="text-sm">
                          Sound Effects
                        </Label>
                        <Switch id="sound" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="vibration" className="text-sm">
                          Vibration
                        </Label>
                        <Switch id="vibration" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode" className="text-sm">
                          Dark Mode
                        </Label>
                        <Switch id="dark-mode" />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dropdown Menus</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    My Games
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    Favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Command Palette</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Inline command palette for quick game search. Perfect for kiosk and tablet interfaces.
            </p>
            <div className="mx-auto w-full max-w-md">
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Search games..." />
                <CommandList>
                  <CommandEmpty>No games found.</CommandEmpty>
                  <CommandGroup heading="Popular Games">
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Catan</span>
                    </CommandItem>
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Ticket to Ride</span>
                    </CommandItem>
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Azul</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Strategy Games">
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Terraforming Mars</span>
                    </CommandItem>
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Wingspan</span>
                    </CommandItem>
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Scythe</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Party Games">
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Codenames</span>
                    </CommandItem>
                    <CommandItem>
                      <Dice5 className="mr-2 h-4 w-4" />
                      <span>Dixit</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
