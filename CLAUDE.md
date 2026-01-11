# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is a Turborepo monorepo for a Board Game Café POS System with Next.js tablet web, NestJS backend API, Expo React Native tablet app, and Electron kiosk app.

## Quick Reference

| App        | Location          | Port | Run                   |
| ---------- | ----------------- | ---- | --------------------- |
| API        | `apps/api`        | 4000 | `pnpm dev`            |
| Tablet Web | `apps/tablet-web` | 3001 | `pnpm dev`            |
| Admin      | `apps/admin`      | 3002 | `pnpm dev`            |
| Tablet App | `apps/tablet-app` | -    | `pnpm dev:tablet-app` |
| Kiosk      | `apps/kiosk`      | -    | `pnpm dev:kiosk`      |
| POS        | `apps/pos`        | -    | `pnpm dev:pos`        |
| Swagger    | -                 | 8000 | Auto with API         |

## Commands

```bash
# Development
pnpm dev                    # Start API + Tablet Web + Admin (not tablet-app/kiosk/pos)
pnpm dev:tablet-app         # Start tablet app separately
pnpm dev:kiosk              # Start kiosk app separately
pnpm dev:pos                # Start POS app separately
pnpm build                  # Build all packages
pnpm lint                   # Lint with auto-fix
pnpm check-types            # TypeScript type check
pnpm test                   # Run all tests
pnpm format                 # Prettier format all files

# Database
pnpm setup:local            # Start PostgreSQL + push Prisma schema
pnpm api prisma studio      # Open Prisma Studio
pnpm api prisma generate    # Generate Prisma client
pnpm api prisma db push     # Push schema changes

# Package-specific (use pnpm <package> <command>)
pnpm api test:unit          # API unit tests
pnpm api test:integration   # API integration tests
pnpm api test:e2e           # API e2e tests
pnpm tablet-web build       # Build tablet-web only
```

## Project Structure

```
apps/
  api/                      # NestJS 11 backend
    src/
      modules/              # Feature modules (use-case pattern)
    prisma/schema/          # Prisma schema files
    test/                   # unit/, integration/, e2e/
  tablet-web/               # Next.js 16 frontend (App Router)
    src/
      app/[locale]/         # i18n routes with next-intl
      components/           # React components
      i18n/                 # Internationalization config
      messages/             # en.json, ko.json
  admin/                    # Next.js 16 admin dashboard (한국어 전용)
    src/
      app/                  # App Router pages
      components/           # React components
  tablet-app/               # Expo 54 tablet app
  kiosk/                    # Electron kiosk app (electron-forge, 1080x1920 세로)
  pos/                      # Electron POS app (electron-forge, 1920x1080 가로)

packages/
  ui/                       # Shared React components (CVA + Tailwind)
  eslint-config/            # ESLint presets (base, nestjs, next)
  typescript-config/        # TSConfig presets
  i18n/                     # Shared i18n config
  server-shared/            # NestJS shared (database, filters, interceptors, config)
  shared/
    api-error/              # API error handling (ApiError, getApiErrorMessage)
    consts/                 # Shared constants
    types/                  # Shared TypeScript types
    exception/              # Exception codes
    utils/                  # Shared utilities
  web-shared/               # Web app shared utilities (Next.js)
  electron-shared/          # Electron app shared utilities
```

## Code Style

### TypeScript (STRICT)

- `noImplicitAny: true`, `strictNullChecks: true`
- NEVER use `as any`, `@ts-ignore`, `@ts-expect-error`
- Prefer `unknown` over `any`, narrow types explicitly
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### Formatting (Prettier)

- Single quotes, no semicolons at statement end: false (semicolons used)
- 120 char line width, 2 space indent
- Trailing commas in ES5 positions
- Arrow parens: avoid when possible

### ESLint Rules

- `no-console: error` - Use logger instead
- `@typescript-eslint/no-explicit-any: error`
- `@typescript-eslint/no-unused-vars: error`
- `@typescript-eslint/no-unnecessary-condition: error`

### Component Props Convention (UI & Frontend)

When defining Props types in single components, always use `interface Props {}`:

```typescript
// Good - simple and consistent
interface Props {
  title: string;
  onClick: () => void;
}

function MyComponent({ title, onClick }: Props) {
  // ...
}

// Bad - unnecessary prefix
interface MyComponentProps {
  title: string;
}
```

This convention applies to all UI components and frontend apps (`packages/ui`, `apps/tablet-web`, `apps/kiosk`, `apps/pos`).

### Imports

- Use path aliases: `@/` for src root in each app
- ES modules (import/export), not CommonJS
- Destructure imports when possible
- Newline after import block

### Re-export 금지 규칙

**NEVER re-export external packages** - 외부 패키지의 내용을 중복으로 re-export하지 않습니다.

```typescript
// ❌ WRONG - 외부 패키지를 re-export
// packages/web-shared/src/api-error.ts
export { ApiError } from '@repo/api-error';

// ✅ CORRECT - 직접 import해서 사용
// apps/admin/src/components/my-component.tsx
import { ApiError, getApiErrorMessage } from '@repo/api-error';
import { createFetchApi } from '@repo/web-shared';
```

각 패키지는 자신만의 고유한 기능만 export하고, 다른 패키지의 기능은 사용하는 곳에서 직접 import합니다.

### Type Management

#### Shared vs App-Specific Types

**Rule**: Only entity types shared across multiple apps should go in `packages/shared/types`. App-specific DTOs remain in the app.

```typescript
// ✅ CORRECT - Shared entity in packages/shared/types
// packages/shared/types/src/store-food.type.ts
export interface Store {
  id: string;
  name: string;
  // ... fields
}

export interface Food {
  id: string;
  storeId: string;
  // ... fields
}

// ✅ CORRECT - App-specific DTO in app
// apps/admin/src/lib/types/foods.types.ts
export type { Food } from '@repo/types';

export interface CreateFoodDto {
  categoryId: string;
  name: string;
  // ... fields (create-specific)
}

export interface UpdateFoodDto {
  name: string;
  // ... fields (update-specific)
}

// ❌ WRONG - Entity DTOs should NOT be in shared types
// packages/shared/types/src/food.type.ts should NOT have CreateFoodDto, UpdateFoodDto
```

#### Type Export Pattern

When moving entity types to `packages/shared/types`:

1. Create or update the type file in `packages/shared/types/src/`
2. Export from `packages/shared/types/src/index.ts` using `export *`
3. In apps, import entities from `@repo/types`, keep DTOs local

```typescript
// packages/shared/types/src/index.ts
export * from './food.type';
export * from './store-food.type';

// apps/admin/src/lib/foods.ts
import type { ApiResponse, Food } from '@repo/types';
import type { CreateFoodDto, UpdateFoodDto } from './types';
```

#### Barrel Exports

- Use `export * from './...'` pattern for barrel exports (index.ts)
- Keeps exports consistent and simplifies maintenance

```typescript
// lib/stores.types.ts
export interface Store {
  id: string;
  name: string;
}

// lib/stores.ts
import type { Store } from './stores.types';
export type { Store } from './stores.types';

// lib/index.ts
export * from './api';
export * from './stores';
```

## API Patterns (NestJS)

### Module Structure

```
modules/<feature>/
  <feature>.module.ts       # Module definition
  <feature>.controller.ts   # HTTP endpoints
  <feature>.swagger.ts      # Swagger decorators (separate file)
  dto/                      # Request/Response DTOs
  use-case/                 # Business logic (one class per use-case)
  exception/                # Feature-specific exceptions
```

### Use-Case Pattern

- One use-case class per operation (CreateUserUseCase, FindUserUseCase)
- Single `execute()` method
- Inject dependencies via constructor
- Keep controllers thin - delegate to use-cases

### Exception Handling

```typescript
// Use CustomException from @repo/server-shared
import { CustomException } from '@repo/server-shared';
import { EXCEPTION_CODES } from '@repo/exception';

throw new CustomException({
  message: 'User not found',
  errorCode: EXCEPTION_CODES.USER_NOT_FOUND,
  statusCode: 404,
});
```

### Swagger Documentation

- Separate swagger decorators into `*.swagger.ts` files
- Use decorator composition for clean controllers
- ApiTags on controller class

### API Versioning

- URI versioning enabled: `/v1/users`
- Default version: 1

## Web Patterns (Next.js)

### App Router + i18n

- Using `next-intl` for internationalization
- Routes under `app/[locale]/`
- Supported locales: `en`, `ko` (in `messages/`)

### Styling

- Tailwind CSS with `@repo/ui` preset
- Use `cn()` utility from `@repo/ui` for class merging
- CVA (class-variance-authority) for component variants

### Components

- Import shared components from `@repo/ui`
- Use `lucide-react` for icons

## Tablet App Patterns (Expo)

### Expo Router

- File-based routing in `app/` directory
- Typed routes enabled
- React Navigation under the hood

### Building

- Development: `pnpm tablet-app start`
- Production: Use EAS Build (not local builds)

## Desktop Patterns (Electron)

### Electron Forge

- Using `electron-forge` with Webpack plugin
- Main process: `src/index.ts`
- Renderer process: `src/renderer.ts`
- Preload script: `src/preload.ts`

### Apps

- **Kiosk**: 고객용 키오스크 (1080x1920 세로, 다국어 지원)
- **POS**: 직원용 POS 시스템 (1920x1080 가로, 한국어만)

### Building

- Development: `pnpm dev:kiosk` / `pnpm dev:pos`
- Package: `pnpm desktop package` / `pnpm pos package`
- Make distributable: `pnpm desktop make` / `pnpm pos make`

### Notes

- Electron binary requires manual postinstall in pnpm monorepo
- Run `node node_modules/.pnpm/electron@*/node_modules/electron/install.js` if electron fails to start

## Testing

### API Tests

```bash
pnpm api test:unit          # Fast, isolated unit tests
pnpm api test:integration   # With database
pnpm api test:e2e           # Full HTTP tests
```

### Test Setup

- Jest with ts-jest
- Separate configs per test type in `test/<type>/jest.config.ts`
- Use `@faker-js/faker` for test data
- Integration tests need database (use `.env.test`)

## Environment Variables

### Required for API

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:6432/mydb?schema=public
API_PORT=8000
APP_ENV=local|staging|production
SWAGGER_USERNAME=xxx      # Required for non-local Swagger
SWAGGER_PASSWORD=xxx
```

### Database

- PostgreSQL via Docker on port 6432
- Container name: `my-monorepo-postgres`
- Start: `docker-compose up -d`

## Development Server

**NEVER run `pnpm dev` or start development servers directly.** The user manages development servers separately. Assume servers are already running when needed.

## Post-Work Verification

After completing any task, **always run verification commands from the repository root**:

```bash
pnpm lint                   # Run from root - checks all packages
pnpm build                  # Run from root - builds all packages
```

**Important rules:**

- NEVER run lint/build from a specific app folder (e.g., `cd apps/api && pnpm lint`)
- ALWAYS run from the monorepo root to ensure the entire project passes
- Both commands must succeed before considering work complete
- This catches cross-package issues and ensures monorepo consistency

## Git Workflow

### Hooks (Husky)

- `pre-push`: Runs `pnpm lint`

### Branch/Commit

- Ensure lint passes before pushing
- Run `pnpm check-types` to verify TypeScript

## Common Tasks

### Add a new API feature module

1. Create `modules/<feature>/` directory
2. Add module, controller, DTOs, use-cases
3. Register module in `app.module.ts`
4. Add exception codes to `packages/shared/exception/`

### Add a new shared type

1. Add to `packages/shared/types/src/`
2. Export from `index.ts`
3. Import as `@repo/types` in consuming apps

### Add i18n translations

1. Add keys to `apps/tablet-web/src/messages/en.json` and `ko.json`
2. Use `useTranslations()` hook from `next-intl`

## Performance Notes

- Turborepo caches builds - use `turbo run build --force` to bypass
- Dev excludes tablet-app, kiosk, and pos by default (use `pnpm dev:tablet-app`, `pnpm dev:kiosk`, or `pnpm dev:pos` separately)
- Prisma client auto-generates on install

## Troubleshooting

### Database connection issues

```bash
docker-compose down && docker-compose up -d
pnpm api prisma db push
```

### Type errors after package changes

```bash
pnpm api prisma generate    # Regenerate Prisma types
pnpm check-types            # Verify
```

### Clean rebuild

```bash
pnpm clean                  # Remove node_modules, dist, tsbuildinfo
pnpm install
pnpm build
```
