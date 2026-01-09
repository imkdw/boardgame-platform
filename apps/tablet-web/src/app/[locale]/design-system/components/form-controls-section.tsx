'use client';

import type { ReactNode } from 'react';
import {
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from '@repo/ui';
import { FormInput } from 'lucide-react';
import { SectionHeader, VariantLabel } from './shared';

export function FormControlsSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Form Controls"
        description="Interactive form elements for user input and selection."
        icon={<FormInput className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Labels & Text</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <VariantLabel label="Label" description="Standalone label component" />
                <div className="space-y-3">
                  <Label>Username</Label>
                  <Label>Email Address</Label>
                  <Label className="text-muted-foreground">Optional Field</Label>
                </div>
              </div>

              <div className="space-y-4">
                <VariantLabel label="Label + Input" description="Label paired with input field" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="mb-4">
                <VariantLabel label="Textarea" description="Multi-line text input for longer content" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="basic-textarea">Basic</Label>
                  <Textarea id="basic-textarea" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placeholder-textarea">With Placeholder</Label>
                  <Textarea id="placeholder-textarea" placeholder="Enter your message here..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled-textarea">Disabled</Label>
                  <Textarea id="disabled-textarea" placeholder="This textarea is disabled" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="char-count-textarea">With Character Count</Label>
                  <Textarea id="char-count-textarea" placeholder="Type your bio..." maxLength={200} />
                  <p className="text-xs text-muted-foreground text-right">0 / 200 characters</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Selection Controls</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4">
                <VariantLabel label="Checkbox" description="Single and grouped checkboxes" />
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="single-checkbox" />
                    <Label htmlFor="single-checkbox">Single checkbox</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" defaultChecked />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Notifications</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="email-notif" defaultChecked />
                        <Label htmlFor="email-notif" className="font-normal">
                          Email notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sms-notif" />
                        <Label htmlFor="sms-notif" className="font-normal">
                          SMS notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="push-notif" defaultChecked />
                        <Label htmlFor="push-notif" className="font-normal">
                          Push notifications
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <VariantLabel label="RadioGroup" description="Single selection from options" />
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Plan Selection</Label>
                    <RadioGroup defaultValue="standard">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="basic" id="basic" />
                        <Label htmlFor="basic" className="font-normal">
                          Basic Plan
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="font-normal">
                          Standard Plan
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="premium" id="premium" />
                        <Label htmlFor="premium" className="font-normal">
                          Premium Plan
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Size</Label>
                    <RadioGroup defaultValue="medium" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small" className="font-normal">
                          S
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="font-normal">
                          M
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large" className="font-normal">
                          L
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <VariantLabel label="Switch" description="Toggle switches for boolean values" />
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="basic-switch" />
                    <Label htmlFor="basic-switch">Basic toggle</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" defaultChecked />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Settings</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode" className="font-normal">
                          Dark Mode
                        </Label>
                        <Switch id="dark-mode" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-save" className="font-normal">
                          Auto Save
                        </Label>
                        <Switch id="auto-save" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="disabled-switch" className="font-normal text-muted-foreground">
                          Disabled Option
                        </Label>
                        <Switch id="disabled-switch" disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dropdown Select</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="basic-select">Basic Select</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-select">With Default Value</Label>
                <Select defaultValue="react">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-select">Game Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategy">Strategy</SelectItem>
                    <SelectItem value="party">Party Games</SelectItem>
                    <SelectItem value="cooperative">Cooperative</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="card">Card Games</SelectItem>
                    <SelectItem value="puzzle">Puzzle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="players-select">Player Count</Label>
                <Select defaultValue="4">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Number of players" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Players</SelectItem>
                    <SelectItem value="3">3 Players</SelectItem>
                    <SelectItem value="4">4 Players</SelectItem>
                    <SelectItem value="5">5 Players</SelectItem>
                    <SelectItem value="6">6+ Players</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="small-select">Small Size</Label>
                <Select>
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                    <SelectItem value="c">Option C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabled-select" className="text-muted-foreground">
                  Disabled Select
                </Label>
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cannot select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Disabled Option</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
