import { Injectable } from '@nestjs/common';
import { StoreGameValidator } from '@repo/server-shared';
import { toStoreGameDto } from '../mapper/store-game.mapper';
import { StoreGameDto } from '../dto/store-game.dto';

@Injectable()
export class FindStoreGameUseCase {
  constructor(private readonly storeGameValidator: StoreGameValidator) {}

  async execute(storeId: string, gameId: string): Promise<StoreGameDto> {
    const game = await this.storeGameValidator.checkExist(storeId, gameId);
    return toStoreGameDto(game);
  }
}
