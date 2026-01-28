import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterStoreDeviceDto } from './dto/register-store-device.dto';
import { UpdateStoreDeviceDto } from './dto/update-store-device.dto';
import { RegisterStoreDeviceUseCase } from './use-case/register-store-device.use-case';
import { FindStoreDevicesUseCase } from './use-case/find-store-devices.use-case';
import { FindStoreDeviceByDeviceIdUseCase } from './use-case/find-store-device-by-device-id.use-case';
import { UpdateStoreDeviceUseCase } from './use-case/update-store-device.use-case';
import { DeleteStoreDeviceUseCase } from './use-case/delete-store-device.use-case';
import * as Swagger from './store-device.swagger';

@ApiTags('매장 디바이스 관리')
@Controller('stores/:storeId/devices')
export class StoreDeviceController {
  constructor(
    private readonly registerStoreDeviceUseCase: RegisterStoreDeviceUseCase,
    private readonly findStoreDevicesUseCase: FindStoreDevicesUseCase,
    private readonly findStoreDeviceByDeviceIdUseCase: FindStoreDeviceByDeviceIdUseCase,
    private readonly updateStoreDeviceUseCase: UpdateStoreDeviceUseCase,
    private readonly deleteStoreDeviceUseCase: DeleteStoreDeviceUseCase
  ) {}

  @Swagger.registerStoreDevice('디바이스 등록')
  @Post()
  async register(@Param('storeId') storeId: string, @Body() dto: RegisterStoreDeviceDto) {
    return this.registerStoreDeviceUseCase.execute(storeId, dto);
  }

  @Swagger.findStoreDevices('디바이스 목록 조회')
  @Get()
  async findDevices(@Param('storeId') storeId: string) {
    return this.findStoreDevicesUseCase.execute(storeId);
  }

  @Swagger.findStoreDeviceByDeviceId('디바이스 ID로 조회')
  @Get('by-device-id/:deviceId')
  async findByDeviceId(@Param('storeId') storeId: string, @Param('deviceId') deviceId: string) {
    return this.findStoreDeviceByDeviceIdUseCase.execute(storeId, deviceId);
  }

  @Swagger.updateStoreDevice('디바이스 수정')
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('storeId') storeId: string, @Param('id') id: string, @Body() dto: UpdateStoreDeviceDto) {
    await this.updateStoreDeviceUseCase.execute(storeId, id, dto);
  }

  @Swagger.deleteStoreDevice('디바이스 삭제')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('storeId') storeId: string, @Param('id') id: string) {
    await this.deleteStoreDeviceUseCase.execute(storeId, id);
  }
}
