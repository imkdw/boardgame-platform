import { plainToInstance } from 'class-transformer';
import { StoreGame } from '@prisma/client';
import { GameDifficulty } from '@repo/consts';
import { StoreGameDto } from '../dto/store-game.dto';

export function toStoreGameDto(game: StoreGame): StoreGameDto {
  return plainToInstance(StoreGameDto, {
    id: game.id,
    storeId: game.storeId,
    name: game.name,
    thumbnail: game.thumbnail,
    images: game.images,
    minPlayers: game.minPlayers,
    maxPlayers: game.maxPlayers,
    playTime: game.playTime,
    difficulty: game.difficulty as GameDifficulty,
    genres: game.genres,
    isRecommended: game.isRecommended,
    stock: game.stock,
    availableStock: game.availableStock,
    description: game.description,
    rules: game.rules,
    videoUrl: game.videoUrl,
  } satisfies StoreGameDto);
}
