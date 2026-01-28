import { CreateStoreUseCase } from '@/modules/store/use-case/create-store.use-case';
import { DeleteStoreUseCase } from '@/modules/store/use-case/delete-store.use-case';
import { FindStoreByIpUseCase } from '@/modules/store/use-case/find-store-by-ip.use-case';
import { FindStoreUseCase } from '@/modules/store/use-case/find-store.use-case';
import { FindStoresUseCase } from '@/modules/store/use-case/find-stores.use-case';
import { SetTabletAdminPasswordUseCase } from '@/modules/store/use-case/set-tablet-admin-password.use-case';
import { UpdateStoreUseCase } from '@/modules/store/use-case/update-store.use-case';
import { VerifyTabletAdminPasswordUseCase } from '@/modules/store/use-case/verify-tablet-admin-password.use-case';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Ip } from '@repo/server-shared';
import { CreateStoreDto } from './dto/create-store.dto';
import { SetTabletAdminPasswordDto } from './dto/set-tablet-admin-password.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { VerifyTabletAdminPasswordDto } from './dto/verify-tablet-admin-password.dto';
import * as Swagger from './store.swagger';

@ApiTags('매장 관리')
@Controller('stores')
export class StoreController {
  constructor(
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly deleteStoreUseCase: DeleteStoreUseCase,
    private readonly findStoreByIpUseCase: FindStoreByIpUseCase,
    private readonly findStoreUseCase: FindStoreUseCase,
    private readonly findStoresUseCase: FindStoresUseCase,
    private readonly setTabletAdminPasswordUseCase: SetTabletAdminPasswordUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly verifyTabletAdminPasswordUseCase: VerifyTabletAdminPasswordUseCase
  ) {}

  @Swagger.createStore('매장 생성')
  @Post()
  async create(@Body() dto: CreateStoreDto) {
    return this.createStoreUseCase.execute(dto);
  }

  @Swagger.findStores('매장 목록 조회')
  @Get()
  async findStores() {
    return this.findStoresUseCase.execute();
  }

  @Swagger.findStoreByIp('IP 기반 매장 조회')
  @Get('ip')
  async findStoreByIp(@Ip() ip: string) {
    return this.findStoreByIpUseCase.execute(ip);
  }

  @Swagger.findStore('매장 상세 조회')
  @Get(':storeId')
  async findStore(@Param('storeId') storeId: string) {
    return this.findStoreUseCase.execute(storeId);
  }

  @Swagger.updateStore('매장 수정')
  @Put(':storeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('storeId') storeId: string, @Body() dto: UpdateStoreDto) {
    await this.updateStoreUseCase.execute(storeId, dto);
  }

  @Swagger.deleteStore('매장 삭제')
  @Delete(':storeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('storeId') storeId: string) {
    await this.deleteStoreUseCase.execute(storeId);
  }

  @Swagger.setTabletAdminPassword('태블릿 관리자 비밀번호 설정')
  @Put(':storeId/tablet-admin-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setTabletAdminPassword(@Param('storeId') storeId: string, @Body() dto: SetTabletAdminPasswordDto) {
    await this.setTabletAdminPasswordUseCase.execute(storeId, dto);
  }

  @Swagger.verifyTabletAdminPassword('태블릿 관리자 비밀번호 검증')
  @Post(':storeId/tablet-admin-password/verify')
  async verifyTabletAdminPassword(@Param('storeId') storeId: string, @Body() dto: VerifyTabletAdminPasswordDto) {
    return this.verifyTabletAdminPasswordUseCase.execute(storeId, dto);
  }
}
