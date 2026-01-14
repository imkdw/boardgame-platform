import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFoodOrderDto } from './dto/create-food-order.dto';
import { FindFoodOrdersQueryDto } from './dto/find-food-orders-query.dto';
import { UpdateFoodOrderStatusDto } from './dto/update-food-order-status.dto';
import { CreateFoodOrderUseCase } from './use-case/create-food-order.use-case';
import { FindFoodOrdersUseCase } from './use-case/find-food-orders.use-case';
import { UpdateFoodOrderStatusUseCase } from './use-case/update-food-order-status.use-case';
import * as Swagger from './food-order.swagger';

@ApiTags('음식 주문 관리')
@Controller('stores/:storeId/food-orders')
export class FoodOrderController {
  constructor(
    private readonly createFoodOrderUseCase: CreateFoodOrderUseCase,
    private readonly findFoodOrdersUseCase: FindFoodOrdersUseCase,
    private readonly updateFoodOrderStatusUseCase: UpdateFoodOrderStatusUseCase,
  ) {}

  @Swagger.createFoodOrder('음식 주문 생성')
  @Post()
  async create(@Param('storeId') storeId: string, @Body() dto: CreateFoodOrderDto) {
    return this.createFoodOrderUseCase.execute(storeId, dto);
  }

  @Swagger.findFoodOrders('음식 주문 목록 조회')
  @Get()
  async findFoodOrders(@Param('storeId') storeId: string, @Query() query: FindFoodOrdersQueryDto) {
    return this.findFoodOrdersUseCase.execute(storeId, query.status);
  }

  @Swagger.updateFoodOrderStatus('음식 주문 상태 변경')
  @Patch(':orderId/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateStatus(
    @Param('storeId') storeId: string,
    @Param('orderId') orderId: string,
    @Body() dto: UpdateFoodOrderStatusDto,
  ) {
    await this.updateFoodOrderStatusUseCase.execute(storeId, orderId, dto);
  }
}
