import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreFoodCategoryDto } from './dto/create-store-food-category.dto';
import { UpdateStoreFoodCategoryDto } from './dto/update-store-food-category.dto';
import { CreateStoreFoodCategoryUseCase } from './use-case/create-store-food-category.use-case';
import { FindStoreFoodCategoriesUseCase } from './use-case/find-store-food-categories.use-case';
import { FindStoreFoodCategoryUseCase } from './use-case/find-store-food-category.use-case';
import { FindStoreFoodCategoryItemsUseCase } from './use-case/find-store-food-category-items.use-case';
import { UpdateStoreFoodCategoryUseCase } from './use-case/update-store-food-category.use-case';
import { DeleteStoreFoodCategoryUseCase } from './use-case/delete-store-food-category.use-case';
import * as Swagger from './store-food-category.swagger';

@ApiTags('매장 음식 카테고리 관리')
@Controller('stores/:storeId/food-categories')
export class StoreFoodCategoryController {
  constructor(
    private readonly createStoreFoodCategoryUseCase: CreateStoreFoodCategoryUseCase,
    private readonly findStoreFoodCategoriesUseCase: FindStoreFoodCategoriesUseCase,
    private readonly findStoreFoodCategoryUseCase: FindStoreFoodCategoryUseCase,
    private readonly findStoreFoodCategoryItemsUseCase: FindStoreFoodCategoryItemsUseCase,
    private readonly updateStoreFoodCategoryUseCase: UpdateStoreFoodCategoryUseCase,
    private readonly deleteStoreFoodCategoryUseCase: DeleteStoreFoodCategoryUseCase
  ) {}

  @Swagger.createStoreFoodCategory('카테고리 생성')
  @Post()
  async create(@Param('storeId') storeId: string, @Body() dto: CreateStoreFoodCategoryDto) {
    return this.createStoreFoodCategoryUseCase.execute(storeId, dto);
  }

  @Swagger.findStoreFoodCategories('카테고리 목록 조회')
  @Get()
  async findCategories(@Param('storeId') storeId: string) {
    return this.findStoreFoodCategoriesUseCase.execute(storeId);
  }

  @Swagger.findStoreFoodCategory('카테고리 상세 조회')
  @Get(':categoryId')
  async findCategory(@Param('storeId') storeId: string, @Param('categoryId') categoryId: string) {
    return this.findStoreFoodCategoryUseCase.execute(storeId, categoryId);
  }

  @Swagger.findStoreFoodCategoryItems('카테고리 내 음식 목록 조회')
  @Get(':categoryId/items')
  async findCategoryItems(@Param('storeId') storeId: string, @Param('categoryId') categoryId: string) {
    return this.findStoreFoodCategoryItemsUseCase.execute(storeId, categoryId);
  }

  @Swagger.updateStoreFoodCategory('카테고리 수정')
  @Put(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('storeId') storeId: string,
    @Param('categoryId') categoryId: string,
    @Body() dto: UpdateStoreFoodCategoryDto
  ) {
    await this.updateStoreFoodCategoryUseCase.execute(storeId, categoryId, dto);
  }

  @Swagger.deleteStoreFoodCategory('카테고리 삭제')
  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('storeId') storeId: string, @Param('categoryId') categoryId: string) {
    await this.deleteStoreFoodCategoryUseCase.execute(storeId, categoryId);
  }
}
