import type { ReactNode } from 'react';
import { Input } from '@repo/ui';
import { Lock, Mail, Search, Type, User } from 'lucide-react';
import { SectionHeader } from './shared';

export function InputSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Input"
        description="Text input fields for forms and search interfaces."
        icon={<Type className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Basic Inputs</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default</label>
                <Input placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">With Value</label>
                <Input defaultValue="Hello World" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Disabled</label>
                <Input placeholder="Disabled input" disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Read Only</label>
                <Input defaultValue="Read only value" readOnly />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Input Types</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <Input type="search" placeholder="Search..." />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">With Icons</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search games..." />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Username" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" type="email" placeholder="Email address" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" type="password" placeholder="Password" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
