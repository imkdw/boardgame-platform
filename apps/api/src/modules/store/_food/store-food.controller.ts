import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreFoodDto } from './dto/create-store-food.dto';
import { UpdateStoreFoodDto } from './dto/update-store-food.dto';
import { CreateStoreFoodUseCase } from './use-case/create-store-food.use-case';
import { DeleteStoreFoodUseCase } from './use-case/delete-store-food.use-case';
import { FindStoreFoodUseCase } from './use-case/find-store-food.use-case';
import { FindStoreFoodsUseCase } from './use-case/find-store-foods.use-case';
import { UpdateStoreFoodUseCase } from './use-case/update-store-food.use-case';
import * as Swagger from './store-food.swagger';

@ApiTags('매장 음식 관리')
@Controller('stores/:storeId/foods')
export class StoreFoodController {
  constructor(
    private readonly createStoreFoodUseCase: CreateStoreFoodUseCase,
    private readonly deleteStoreFoodUseCase: DeleteStoreFoodUseCase,
    private readonly findStoreFoodUseCase: FindStoreFoodUseCase,
    private readonly findStoreFoodsUseCase: FindStoreFoodsUseCase,
    private readonly updateStoreFoodUseCase: UpdateStoreFoodUseCase,
  ) {}

  @Swagger.createStoreFood('음식 생성')
  @Post()
  async create(@Param('storeId') storeId: string, @Body() dto: CreateStoreFoodDto) {
    return this.createStoreFoodUseCase.execute(storeId, dto);
  }

  @Swagger.findStoreFoods('음식 목록 조회')
  @Get()
  async findStoreFoods(@Param('storeId') storeId: string) {
    return this.findStoreFoodsUseCase.execute(storeId);
  }

  @Swagger.findStoreFood('음식 상세 조회')
  @Get(':foodId')
  async findStoreFood(@Param('storeId') storeId: string, @Param('foodId') foodId: string) {
    return this.findStoreFoodUseCase.execute(storeId, foodId);
  }

  @Swagger.updateStoreFood('음식 수정')
  @Put(':foodId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('storeId') storeId: string,
    @Param('foodId') foodId: string,
    @Body() dto: UpdateStoreFoodDto,
  ) {
    await this.updateStoreFoodUseCase.execute(storeId, foodId, dto);
  }

  @Swagger.deleteStoreFood('음식 삭제')
  @Delete(':foodId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('storeId') storeId: string, @Param('foodId') foodId: string) {
    await this.deleteStoreFoodUseCase.execute(storeId, foodId);
  }
}
