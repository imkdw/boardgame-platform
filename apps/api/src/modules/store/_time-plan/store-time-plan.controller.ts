import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreTimePlanDto } from './dto/create-store-time-plan.dto';
import { UpdateStoreTimePlanDto } from './dto/update-store-time-plan.dto';
import { CreateStoreTimePlanUseCase } from './use-case/create-store-time-plan.use-case';
import { DeleteStoreTimePlanUseCase } from './use-case/delete-store-time-plan.use-case';
import { FindStoreTimePlansUseCase } from './use-case/find-store-time-plans.use-case';
import { UpdateStoreTimePlanUseCase } from './use-case/update-store-time-plan.use-case';
import * as Swagger from './store-time-plan.swagger';

@ApiTags('매장 시간 플랜 관리')
@Controller('stores/:storeId/time-plans')
export class StoreTimePlanController {
  constructor(
    private readonly createStoreTimePlanUseCase: CreateStoreTimePlanUseCase,
    private readonly deleteStoreTimePlanUseCase: DeleteStoreTimePlanUseCase,
    private readonly findStoreTimePlansUseCase: FindStoreTimePlansUseCase,
    private readonly updateStoreTimePlanUseCase: UpdateStoreTimePlanUseCase,
  ) {}

  @Swagger.createStoreTimePlan('시간 플랜 생성')
  @Post()
  async create(@Param('storeId') storeId: string, @Body() dto: CreateStoreTimePlanDto) {
    return this.createStoreTimePlanUseCase.execute(storeId, dto);
  }

  @Swagger.findStoreTimePlans('시간 플랜 목록 조회')
  @Get()
  async findTimePlans(@Param('storeId') storeId: string) {
    return this.findStoreTimePlansUseCase.execute(storeId);
  }

  @Swagger.updateStoreTimePlan('시간 플랜 수정')
  @Put(':planId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('storeId') storeId: string,
    @Param('planId') planId: string,
    @Body() dto: UpdateStoreTimePlanDto,
  ) {
    await this.updateStoreTimePlanUseCase.execute(storeId, planId, dto);
  }

  @Swagger.deleteStoreTimePlan('시간 플랜 삭제')
  @Delete(':planId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('storeId') storeId: string, @Param('planId') planId: string) {
    await this.deleteStoreTimePlanUseCase.execute(storeId, planId);
  }
}
