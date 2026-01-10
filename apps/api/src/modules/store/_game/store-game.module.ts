import { Module } from '@nestjs/common';
import { StoreGameController } from './store-game.controller';
import { CreateStoreGameUseCase } from './use-case/create-store-game.use-case';
import { DeleteStoreGameUseCase } from './use-case/delete-store-game.use-case';
import { FindStoreGameUseCase } from './use-case/find-store-game.use-case';
import { FindStoreGamesUseCase } from './use-case/find-store-games.use-case';
import { UpdateStoreGameUseCase } from './use-case/update-store-game.use-case';

@Module({
  controllers: [StoreGameController],
  providers: [
    CreateStoreGameUseCase,
    DeleteStoreGameUseCase,
    FindStoreGameUseCase,
    FindStoreGamesUseCase,
    UpdateStoreGameUseCase,
  ],
})
export class StoreGameModule {}
