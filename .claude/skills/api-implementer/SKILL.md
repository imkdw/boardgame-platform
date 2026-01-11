---
name: bgp-api-implementation
description: Guide for implementing NestJS API modules.
---

# API Implementer Skill

Guide for implementing NestJS API modules.

## Module Structure

```
modules/<feature>/
  <feature>.module.ts       # Module definition
  <feature>.controller.ts   # HTTP endpoints
  <feature>.swagger.ts      # Swagger decorators (separate file)
  dto/
    <feature>.dto.ts        # Response DTO
    create-<feature>.dto.ts # Create request DTO
    update-<feature>.dto.ts # Update request DTO
  use-case/
    create-<feature>.use-case.ts
    find-<feature>.use-case.ts
    find-<feature>s.use-case.ts
    update-<feature>.use-case.ts
    delete-<feature>.use-case.ts
  mapper/
    <feature>.mapper.ts     # Entity -> DTO conversion function
```

## Prisma Schema

```prisma
model Feature {
  id        String    @id
  name      String
  // ... other fields
  createdAt DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt DateTime  @updatedAt @map("updated_at") @db.Timestamptz
  deletedAt DateTime? @map("deleted_at") @db.Timestamptz

  @@map("feature")
}
```

- `id`: Use String UUID
- `createdAt`, `updatedAt`, `deletedAt`: Required timestamp fields
- Use snake_case mapping (`@map`)
- **All DateTime fields must use `@db.Timestamptz` for PostgreSQL**

## Constants (packages/shared/consts)

Constants like MAX_LENGTH should be defined in `packages/shared/consts/src/<feature>.const.ts`:

```typescript
// packages/shared/consts/src/<feature>.const.ts
export const FEATURE_NAME_MAX_LENGTH = 50;
export const FEATURE_DESCRIPTION_MAX_LENGTH = 200;
```

Then export from index:

```typescript
// packages/shared/consts/src/index.ts
export * from './<feature>.const';
```

Import in DTO:

```typescript
import { FEATURE_NAME_MAX_LENGTH } from '@repo/consts';
```

- `MIN_LENGTH` is unnecessary since `IsNotEmptyString` handles it
- Define only `MAX_LENGTH` constants when needed

## Enum/Status Values (IMPORTANT)

**NEVER use Prisma enum or TypeScript enum.** Use `const ... = {} as const` pattern instead.

### In Prisma Schema

Use `String` type with default value:

```prisma
model Feature {
  status String @default("ACTIVE")  // NOT enum
}
```

### In Constants

```typescript
// packages/shared/consts/src/<feature>.const.ts
export const FEATURE_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
} as const;

export type FeatureStatus = (typeof FEATURE_STATUS)[keyof typeof FEATURE_STATUS];

export const FEATURE_STATUS_VALUES = Object.values(FEATURE_STATUS);
```

### In DTO

```typescript
import { IsIn } from 'class-validator';
import { FEATURE_STATUS_VALUES, FeatureStatus } from '@repo/consts';

export class CreateFeatureDto {
  @ApiProperty({ enum: FEATURE_STATUS_VALUES })
  @IsIn(FEATURE_STATUS_VALUES)
  status: FeatureStatus;
}
```

### In Mapper

```typescript
import { FeatureStatus } from '@repo/consts';

export function toFeatureDto(feature: Feature): FeatureDto {
  return plainToInstance(FeatureDto, {
    status: feature.status as FeatureStatus,
    // ...
  } satisfies FeatureDto);
}
```

## Controller

```typescript
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Swagger from './<feature>.swagger';

@ApiTags('Feature Management')
@Controller('<features>')
export class FeatureController {
  constructor(
    private readonly createFeatureUseCase: CreateFeatureUseCase,
    private readonly deleteFeatureUseCase: DeleteFeatureUseCase,
    private readonly findFeatureUseCase: FindFeatureUseCase,
    private readonly findFeaturesUseCase: FindFeaturesUseCase,
    private readonly updateFeatureUseCase: UpdateFeatureUseCase
  ) {}

  @Swagger.createFeature('Create feature')
  @Post()
  async create(@Body() dto: CreateFeatureDto) {
    return this.createFeatureUseCase.execute(dto);
  }

  @Swagger.findFeatures('Get feature list')
  @Get()
  async findFeatures() {
    return this.findFeaturesUseCase.execute();
  }

  @Swagger.findFeature('Get feature detail')
  @Get(':featureId')
  async findFeature(@Param('featureId') featureId: string) {
    return this.findFeatureUseCase.execute(featureId);
  }

  @Swagger.updateFeature('Update feature')
  @Put(':featureId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('featureId') featureId: string, @Body() dto: UpdateFeatureDto) {
    await this.updateFeatureUseCase.execute(featureId, dto);
  }

  @Swagger.deleteFeature('Delete feature')
  @Delete(':featureId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('featureId') featureId: string) {
    await this.deleteFeatureUseCase.execute(featureId);
  }
}
```

## Swagger (Separate File)

```typescript
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function createFeature(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateFeatureDto }),
    ApiCreatedResponse({ type: FeatureDto })
  );
}

export function findFeatures(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [FeatureDto] }));
}

export function findFeature(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: FeatureDto }));
}

export function updateFeature(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateFeatureDto }), ApiNoContentResponse());
}

export function deleteFeature(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
```

## Shared vs App-Specific Types

**Rule**: Only entity types shared across multiple apps should go in `packages/shared/types`. App-specific DTOs remain in the app (e.g., `apps/admin/src/lib/types`).

### When to Move Types to Shared

Move entity types to `packages/shared/types` when:

- Used across 2+ apps (admin, tablet-web, tablet-app, etc.)
- Represent domain entities (Store, Food, FoodCategory, User, etc.)
- Need to be type-consistent across different consumers

### What to Keep Local

Keep DTOs in app-specific locations:

- Create DTOs (`CreateXxxDto`) - request shapes differ by consumer
- Update DTOs (`UpdateXxxDto`) - validation rules vary by context
- App-specific response DTOs - if API returns different shapes per consumer

### Pattern Example

```typescript
// ✅ CORRECT - Shared entity
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

// ✅ CORRECT - App-specific DTO
// apps/admin/src/lib/types/foods.types.ts
export type { Food } from '@repo/types';

export interface CreateFoodDto {
  categoryId: string; // Required on create, not in entity
  name: string;
  // ... fields
}

export interface UpdateFoodDto {
  name: string;
  // ... fields
}

// ✅ CORRECT - Import pattern in app
// apps/admin/src/lib/foods.ts
import type { ApiResponse, Food } from '@repo/types';
import type { CreateFoodDto, UpdateFoodDto } from './types';

export type { Food } from '@repo/types';
export type { CreateFoodDto, UpdateFoodDto } from './types';
```

### Shared Type Organization

Create separate files per domain in `packages/shared/types/src/`:

- `food.type.ts` - FoodItem, FoodCategory (consumer-facing)
- `store-food.type.ts` - Store, Food (admin-focused)
- `game.type.ts` - Game-related entities
- Export all from `index.ts` using `export *`

## DTO

### Request DTO (Create/Update)

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, MaxLength } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';
import { FEATURE_NAME_MAX_LENGTH } from '@repo/consts';

export class CreateFeatureDto {
  @ApiProperty({ example: 'example value' })
  @IsNotEmptyString()
  @MaxLength(FEATURE_NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  count: number;

  @ApiProperty({ example: 37.5665 })
  @IsNumber()
  latitude: number;
}
```

- Use `IsInt()` for integer fields (no decimals allowed)
- Use `IsNumber()` for float fields
- No need for `IsNotEmpty()` on numeric fields

### Response DTO

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class FeatureDto {
  @ApiProperty({ description: 'ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: 'Name', example: 'example' })
  name: string;
}
```

## Mapper

```typescript
import { plainToInstance } from 'class-transformer';
import { Feature } from '@prisma/client';
import { FeatureDto } from '../dto/<feature>.dto';

export function toFeatureDto(feature: Feature): FeatureDto {
  return plainToInstance(FeatureDto, {
    id: feature.id,
    name: feature.name,
  } satisfies FeatureDto);
}
```

- Write as simple function (no DI needed)
- Use `plainToInstance`
- Use `satisfies FeatureDto` for type safety
- Array conversion: `features.map(toFeatureDto)`

## Use-Case

### Create

```typescript
@Injectable()
export class CreateFeatureUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly featureValidator: FeatureValidator
  ) {}

  async execute(dto: CreateFeatureDto): Promise<Feature> {
    await this.featureValidator.checkExistName(dto.name);

    return this.prisma.feature.create({
      data: {
        id: randomUUID(),
        name: dto.name,
      },
    });
  }
}
```

### Find (Single)

```typescript
@Injectable()
export class FindFeatureUseCase {
  constructor(private readonly featureValidator: FeatureValidator) {}

  async execute(featureId: string): Promise<FeatureDto> {
    const feature = await this.featureValidator.checkExist(featureId);
    return toFeatureDto(feature);
  }
}
```

### Find (List)

```typescript
@Injectable()
export class FindFeaturesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<FeatureDto[]> {
    const features = await this.prisma.feature.findMany({
      where: { deletedAt: null },
    });
    return features.map(toFeatureDto);
  }
}
```

### Update

```typescript
@Injectable()
export class UpdateFeatureUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly featureValidator: FeatureValidator
  ) {}

  async execute(featureId: string, dto: UpdateFeatureDto): Promise<void> {
    const feature = await this.featureValidator.checkExist(featureId);

    if (dto.name !== feature.name) {
      await this.featureValidator.checkExistName(dto.name);
    }

    await this.prisma.feature.update({
      where: { id: featureId },
      data: dto,
    });
  }
}
```

- Pass the entire DTO to `data` when possible
- Only specify individual fields when necessary

### Delete (Soft Delete)

```typescript
@Injectable()
export class DeleteFeatureUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly featureValidator: FeatureValidator
  ) {}

  async execute(featureId: string): Promise<void> {
    await this.featureValidator.checkExist(featureId);

    await this.prisma.feature.update({
      where: { id: featureId },
      data: { deletedAt: new Date() },
    });
  }
}
```

## Validator (server-shared)

```typescript
// packages/server-shared/src/validator/<feature>.validator.ts
@Injectable()
export class FeatureValidator {
  constructor(private readonly prisma: PrismaService) {}

  async checkExist(featureId: string): Promise<Feature> {
    const feature = await this.prisma.feature.findFirst({
      where: { id: featureId, deletedAt: null },
    });

    if (!feature) {
      throw new FeatureNotFoundException(`Feature with id ${featureId} not found`);
    }

    return feature;
  }

  async checkExistName(name: string): Promise<void> {
    const existing = await this.prisma.feature.findFirst({
      where: { name, deletedAt: null },
    });

    if (existing) {
      throw new ExistFeatureNameException(`Feature with name ${name} already exists`);
    }
  }
}
```

- Always include `deletedAt: null` condition in queries
- Use `findFirst` instead of `findUnique` (allows deletedAt condition)

## Module

```typescript
@Module({
  controllers: [FeatureController],
  providers: [
    CreateFeatureUseCase,
    DeleteFeatureUseCase,
    FindFeatureUseCase,
    FindFeaturesUseCase,
    UpdateFeatureUseCase,
  ],
})
export class FeatureModule {}
```

## Checklist

When creating a new API module:

- [ ] Add model to Prisma schema (include createdAt, updatedAt, deletedAt with `@db.Timestamptz`)
- [ ] Create constants in `packages/shared/consts/src/<feature>.const.ts`
- [ ] Export constants from `packages/shared/consts/src/index.ts`
- [ ] Create DTOs (create, update, response)
- [ ] Create mapper function (use `plainToInstance`)
- [ ] Create use-cases (create, find, findAll, update, delete)
- [ ] Create validator (server-shared)
- [ ] Create exceptions (server-shared)
- [ ] Add exception codes (packages/shared/exception)
- [ ] Create controller
- [ ] Create swagger decorators
- [ ] Create module and register in app.module.ts
- [ ] Run `pnpm api prisma generate`

## Final Verification

After completing all implementation:

```bash
pnpm lint
pnpm build
```
