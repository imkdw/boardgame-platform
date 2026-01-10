import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStoreFoodCategoryDto } from './dto/create-store-food-category.dto';
import { StoreFoodCategoryDto } from './dto/store-food-category.dto';
import { StoreFoodCategoryItemDto } from './dto/store-food-category-item.dto';
import { UpdateStoreFoodCategoryDto } from './dto/update-store-food-category.dto';

export function createStoreFoodCategory(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateStoreFoodCategoryDto }),
    ApiCreatedResponse({ type: StoreFoodCategoryDto })
  );
}

export function findStoreFoodCategories(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreFoodCategoryDto] }));
}

export function findStoreFoodCategory(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoreFoodCategoryDto }));
}

export function findStoreFoodCategoryItems(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreFoodCategoryItemDto] }));
}

export function updateStoreFoodCategory(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: UpdateStoreFoodCategoryDto }),
    ApiNoContentResponse()
  );
}

export function deleteStoreFoodCategory(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
