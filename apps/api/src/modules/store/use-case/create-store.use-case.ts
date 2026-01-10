import { Injectable } from '@nestjs/common';
import { Store } from '@prisma/client';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { CreateStoreDto } from '../dto/create-store.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(dto: CreateStoreDto): Promise<Store> {
    await this.storeValidator.checkExistName(dto.name);

    return this.prisma.store.create({
      data: {
        id: randomUUID(),
        name: dto.name,
        address: dto.address,
        wifiName: dto.wifiName,
        wifiPassword: dto.wifiPassword,
        contact: dto.contact,
        introVideoUrl: dto.introVideoUrl ?? null,
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
    });
  }
}
