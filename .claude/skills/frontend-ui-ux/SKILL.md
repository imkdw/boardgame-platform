---
name: bgp-ui-design
description: Create distinctive UI/UX designs based on BGP (BoardGame Platform) Design System. Use when building React components for the boardgame platform with the custom color system featuring purple primary and pink accent colors.
---

# BGP (BoardGame Platform) Design System

## Overview

This skill guides creation of frontend interfaces using BGP Design System - a comprehensive design system with a carefully crafted color palette featuring purple primary colors, pink accents, and semantic color tokens for consistent UI development.

## Core Design Principles

### 1. Typography

**Primary Font:**
- Pretendard Variable (Korean-first, excellent readability)
- Fallback: -apple-system, BlinkMacSystemFont, system-ui, sans-serif

### 2. BGP Color System

#### Primitive Colors (Full Scale)

| Scale | Primary (Purple) | Accent (Pink) | Gray | Danger (Red) | Warning (Yellow) | Complete (Green) |
|-------|------------------|---------------|------|--------------|------------------|------------------|
| 10 | #f0e7fe | #fee7f1 | #f2f2f2 | #ffbdad | #fff1cc | #c8eede |
| 20 | #d3b7fb | #fbb7d4 | #dddddd | #ff937a | #ffe499 | #a1e3c7 |
| 30 | #b687f8 | #f887b8 | #b3b3b3 | #ff6a47 | #ffd666 | #7ad7af |
| 40 | #9957f5 | #f5579b | #999999 | #ff4014 | #ffc933 | #53cb98 |
| 50 | **#7c27f2** | **#f2277f** | #8a8a8a | **#e22a00** | **#ffbb00** | #36b37e |
| 60 | #620dd8 | #d80d65 | #777777 | #ad2000 | #cc9600 | **#2b8d63** |
| 70 | #4c0aa8 | #a80a4f | #595959 | #7a1700 | #997000 | #1f6648 |
| 80 | #370778 | #780738 | #333333 | #470d00 | #664b00 | #133f2c |
| 90 | #210448 | #480422 | #1a1a1a | #140400 | #332500 | #071811 |
| 0/100 | - | - | #ffffff / #111111 | - | - | - |

**Bold = Primary semantic token level (50 or 60)**

#### Semantic Color Tokens

**General Purpose (Usually)**
| Token | Source | Hex |
|-------|--------|-----|
| `primary` | primary-50 | #7c27f2 |
| `click` | primary-70 | #4c0aa8 |
| `border` | gray-30 | #b3b3b3 |
| `disabled` | gray-20 | #dddddd |
| `success` | complete-60 | #2b8d63 |
| `danger` | danger-50 | #e22a00 |
| `warning` | warning-50 | #ffbb00 |

**Text Colors**
| Token | Source | Hex | Use Case |
|-------|--------|-----|----------|
| `title` | gray-100 | #111111 | Headings |
| `body` | gray-80 | #333333 | Body text |
| `description` | gray-70 | #595959 | Secondary |
| `placeholder` | gray-40 | #999999 | Inputs |
| `disabled` | gray-30 | #b3b3b3 | Disabled |

**Status Colors**
| Token | Source | Use Case |
|-------|--------|----------|
| `progress` | primary-50 | In progress |
| `complete` | complete-60 | Success |
| `warning` | warning-50 | Warning |
| `error` | danger-50 | Error |
| `new` | accent-50 | New items |

### 3. Tailwind CSS Usage

#### Using Semantic Colors (Recommended)
```tsx
<div className="bg-background text-foreground">
  <h1 className="text-text-title">Heading</h1>
  <p className="text-text-description">Description</p>
  <button className="bg-primary text-primary-foreground">Action</button>
</div>
```

#### Using BGP Primitive Colors
```tsx
<div className="bg-bgp-gray-10 border-bgp-gray-30">
  <span className="text-bgp-primary-50">Primary text</span>
  <span className="text-bgp-accent-50">Accent text</span>
  <span className="bg-bgp-danger-50 text-white">Error badge</span>
</div>
```

#### Using Status Colors
```tsx
<Badge className="bg-status-progress text-white">진행 중</Badge>
<Badge className="bg-status-complete text-white">완료</Badge>
<Badge className="bg-status-warning text-white">주의</Badge>
<Badge className="bg-status-error text-white">오류</Badge>
<Badge className="bg-status-new text-white">신규</Badge>
```

### 4. Available Tailwind Color Classes

**BGP Primitive (bg-, text-, border-)**
- `bgp-primary-{10-90}` - Purple scale
- `bgp-accent-{10-90}` - Pink scale
- `bgp-gray-{0-100}` - Gray scale
- `bgp-danger-{10-90}` - Red scale
- `bgp-warning-{10-90}` - Yellow scale
- `bgp-complete-{10-90}` - Green scale
- `bgp-alpha-black-{0-90}` - Black transparency
- `bgp-alpha-white-{0-90}` - White transparency

**Semantic Colors**
- `primary`, `primary-foreground`, `primary-hover`, `primary-click`
- `secondary`, `secondary-foreground`
- `destructive`, `destructive-foreground`
- `accent`, `accent-foreground`
- `muted`, `muted-foreground`
- `card`, `card-foreground`
- `background`, `foreground`
- `border`, `input`, `ring`

**Status**
- `status-progress`, `status-complete`, `status-warning`, `status-error`, `status-default`, `status-new`

**Text Hierarchy**
- `text-title`, `text-body`, `text-description`, `text-placeholder`, `text-disabled`, `text-information`

**Button States**
- `btn-default`, `btn-hover`, `btn-click`, `btn-disabled`

## File References

- CSS Variables: `packages/ui/src/styles/globals.css`
- Tailwind Preset: `packages/ui/src/tokens/tailwind-preset.ts`
- Design Tokens Source: `docs/design.json`
