# @repo/ui - Design System

Shared React UI component library built on Shadcn/ui (new-york style) + CVA + Tailwind CSS + Radix UI.

## Quick Reference

| Export           | Path                       | Usage                                   |
| ---------------- | -------------------------- | --------------------------------------- |
| Components/Utils | `@repo/ui`                 | `import { Button, cn } from '@repo/ui'` |
| Global CSS       | `@repo/ui/globals.css`     | `import '@repo/ui/globals.css'`         |
| Tailwind Preset  | `@repo/ui/tailwind-preset` | `presets: [tailwindPreset]`             |

## Commands

```bash
pnpm ui lint          # Lint components
pnpm ui check-types   # TypeScript check
```

## Directory Structure

```
src/
  components/           # UI components (CVA-based)
    index.ts            # Barrel export
    button.tsx
    badge.tsx
    card.tsx
    dialog.tsx
    input.tsx
    tabs.tsx
  tokens/
    tailwind-preset.ts  # Tailwind theme extension (colors, animations)
  styles/
    globals.css         # CSS variables (light/dark mode)
  lib/
    utils.ts            # cn() utility (clsx + tailwind-merge)
  index.ts              # Main export
```

## Component Architecture

### Pattern: CVA + Radix + Tailwind

All components follow this structure:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// 1. Define variants with CVA
const buttonVariants = cva('base-classes...', {
  variants: {
    variant: { default: '...', secondary: '...', destructive: '...' },
    size: { default: '...', sm: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

// 2. Component with data-slot attribute
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// 3. Export component AND variants
export { Button, buttonVariants };
```

### Key Conventions

| Convention      | Description                                              |
| --------------- | -------------------------------------------------------- |
| `data-slot`     | Every component root has `data-slot="component-name"`    |
| `asChild` prop  | Uses `@radix-ui/react-slot` for composition              |
| `cn()` utility  | Always use for class merging (`clsx` + `tailwind-merge`) |
| Variants export | Export both component and `*Variants` for external use   |

## Design Tokens

### CSS Variables (globals.css)

Defined in `:root` (light) and `.dark` (dark mode):

```css
/* Core */
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--destructive, --destructive-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--card, --card-foreground
--popover, --popover-foreground
--border, --input, --ring, --radius

/* Custom: Status Colors */
--status-progress    /* #0065ff - In progress (blue) */
--status-complete    /* #36b37e - Complete (green) */
--status-warning     /* #ffab00 - Warning (yellow) */
--status-error       /* #e22a00 - Error (red) */
--status-default     /* #ebecf0 - Default (gray) */
--status-new         /* #6554c0 - New (purple) */

/* Custom: Text Hierarchy */
--text-deepblack     /* #111111 - Headings */
--text-black         /* #333333 - Body */
--text-lightblack    /* #777777 - Secondary */
--text-gray          /* #999999 - Disabled */
--text-lightgray     /* #dddddd - Placeholder */

/* Custom: Button States */
--btn-default, --btn-hover, --btn-focused, --btn-click
```

### Tailwind Preset (tailwind-preset.ts)

Extends Tailwind with:

- **Colors**: `primary`, `secondary`, `destructive`, `muted`, `accent`, `card`, `popover`, `status.*`, `text.*`
- **Border Radius**: `lg`, `md`, `sm` (based on `--radius`)
- **Animations**: `fade-in`, `fade-out`, `slide-up`, `slide-down`, `pulse`

## Available Components (30)

### Form & Input Components

| Component    | Variants / Props                                                                                                                                           | Notes                                                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Button`     | variant: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`; size: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`, `touch`, `touch-lg` | Touch sizes for kiosk/tablet. Exports `buttonVariants`                                                                                                                               |
| `Input`      | -                                                                                                                                                          | Standard input with focus states                                                                                                                                                     |
| `Textarea`   | -                                                                                                                                                          | Multi-line text input                                                                                                                                                                |
| `Label`      | -                                                                                                                                                          | Form label with Radix UI                                                                                                                                                             |
| `Checkbox`   | -                                                                                                                                                          | Radix UI checkbox                                                                                                                                                                    |
| `RadioGroup` | -                                                                                                                                                          | Compound: `RadioGroup`, `RadioGroupItem`                                                                                                                                             |
| `Switch`     | -                                                                                                                                                          | Toggle switch                                                                                                                                                                        |
| `Select`     | -                                                                                                                                                          | Compound: `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton` |
| `Form`       | -                                                                                                                                                          | react-hook-form integration. Compound: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`                                                 |

### Data Display Components

| Component   | Variants / Props                                                                                             | Notes                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `Badge`     | variant: `default`, `secondary`, `destructive`, `outline`, `progress`, `complete`, `warning`, `error`, `new` | Status variants for domain use. Exports `badgeVariants`                                                            |
| `Card`      | -                                                                                                            | Compound: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`          |
| `Table`     | -                                                                                                            | Compound: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` |
| `Avatar`    | -                                                                                                            | Compound: `Avatar`, `AvatarImage`, `AvatarFallback`                                                                |
| `Separator` | orientation: `horizontal`, `vertical`                                                                        | Visual divider                                                                                                     |
| `Skeleton`  | -                                                                                                            | Loading placeholder                                                                                                |
| `Progress`  | value: `number`                                                                                              | Progress bar indicator                                                                                             |
| `Calendar`  | -                                                                                                            | Date picker from react-day-picker                                                                                  |
| `Carousel`  | -                                                                                                            | Compound: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`                        |

### Feedback Components

| Component | Variants / Props                                                                     | Notes                                                                                         |
| --------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `Alert`   | variant: `default`, `destructive`, `progress`, `complete`, `warning`, `error`, `new` | Status variants. Compound: `Alert`, `AlertTitle`, `AlertDescription`. Exports `alertVariants` |
| `Sonner`  | -                                                                                    | Toast notifications via `Toaster` component                                                   |
| `Tooltip` | -                                                                                    | Compound: `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`                    |

### Overlay Components

| Component      | Variants / Props                       | Notes                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Dialog`       | showCloseButton: `boolean`             | Compound: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`, `DialogOverlay`, `DialogPortal`                                                                                                                                                                                          |
| `Sheet`        | side: `top`, `right`, `bottom`, `left` | Bottom sheet / side panel. Compound: `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`                                                                                                                                                                                                        |
| `Popover`      | -                                      | Compound: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`                                                                                                                                                                                                                                                                                          |
| `DropdownMenu` | -                                      | Compound: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup` |
| `Command`      | -                                      | Command palette / autocomplete. Compound: `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`, `CommandDialog`                                                                                                                                                                         |

### Navigation Components

| Component    | Variants / Props           | Notes                                                                                                                                         |
| ------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tabs`       | -                          | Compound: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                                                                                    |
| `Accordion`  | type: `single`, `multiple` | Compound: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`                                                                |
| `Pagination` | -                          | Compound: `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` |
| `ScrollArea` | -                          | Compound: `ScrollArea`, `ScrollBar`                                                                                                           |

## Usage in Consuming Apps

### 1. Configure Tailwind

```ts
// tailwind.config.ts
import { tailwindPreset } from '@repo/ui/tailwind-preset';

export default {
  presets: [tailwindPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}', // Include UI package
  ],
};
```

### 2. Import Global CSS

```tsx
// app/layout.tsx or globals.css
import '@repo/ui/globals.css';
```

### 3. Use Components

```tsx
import { Button, Badge, Card, CardHeader, CardTitle, cn } from '@repo/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <Badge variant="complete">Done</Badge>
      </CardHeader>
      <Button variant="default" size="touch">
        Touch-friendly Button
      </Button>
    </Card>
  );
}
```

## Adding New Components

### Option 1: Shadcn CLI (Recommended)

```bash
cd packages/ui
npx shadcn@latest add [component-name]
```

Config in `components.json`:

- Style: `new-york`
- Base color: `zinc`
- CSS variables: enabled
- Icon library: `lucide`

### Option 2: Manual Creation

1. Create `src/components/[name].tsx`
2. Follow CVA pattern above
3. Add `data-slot` attribute
4. Export from `src/components/index.ts`
5. If new color tokens needed, update `globals.css` and `tailwind-preset.ts`

## Code Style

- **Functional components only** (no class components)
- **No `as any`** or `@ts-ignore`
- **Always use `cn()`** for className (never raw string concatenation)
- **Export variants** alongside components for external composition
- **HSL color format** in CSS variables (e.g., `266 87% 55%`)

## Design Philosophy

**Use shadcn/ui defaults. Only customize colors.**

Components follow shadcn/ui (new-york style) exactly. Customization is limited to:

1. **Brand colors** - `--primary` set to #7c27f2 (purple)
2. **Status colors** - Custom `status-*` variants for domain use
3. **Text hierarchy** - Custom `text-*` colors for consistent typography

Do NOT modify:

- Border radius (keep shadcn defaults)
- Shadows (keep shadcn defaults)
- Animations (keep shadcn defaults)
- Spacing (keep shadcn defaults)

## Dependencies

| Package                    | Purpose                      |
| -------------------------- | ---------------------------- |
| `@radix-ui/react-*`        | Headless UI primitives       |
| `class-variance-authority` | Variant management           |
| `clsx`                     | Conditional classes          |
| `tailwind-merge`           | Tailwind class deduplication |
| `lucide-react`             | Icons                        |

## Related Docs

- `/docs/color-system.md` - Full color specification
- `/docs/design-requirements.md` - Screen designs and component mapping
- `/docs/ui-ux-concept.md` - Design philosophy

## Platform-Specific Notes

| Platform    | Consideration                                                 |
| ----------- | ------------------------------------------------------------- |
| Kiosk       | Use `touch` / `touch-lg` button sizes (min 48px touch target) |
| Tablet      | Horizontal layout, WebView optimized                          |
| Desktop POS | Data-dense layouts, keyboard navigation                       |
