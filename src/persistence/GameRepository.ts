import { IGameRepository } from "@/interfaces/repositories/IGameRepository";
import { Game } from "@/models/Game";
import { AppDataSource } from "@/data-source";
import { transactionWrapper } from "@/persistence/handler";

export class GameRepository implements IGameRepository {
  delete(id: number): Promise<Game> {
    return Promise.resolve(undefined);
  }

  findById(id: number): Promise<Game> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .findOneBy(Game, { id }),
        queryRunner);
  }

  async save(entity: Game): Promise<Game> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .save(entity),
        queryRunner);
  }

  update(entity: Game): Promise<Game> {
    return Promise.resolve(undefined);
  }

  async findAll(): Promise<Game[]> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .find(Game),
        queryRunner);
  }
}
