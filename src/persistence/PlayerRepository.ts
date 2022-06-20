import { Player } from "@/models/Player";
import { AppDataSource } from "@/data-source";
import { IPlayerRepository } from "@/interfaces/repositories/IPlayerRepository";
import { transactionWrapper } from "@/persistence/handler";

export class PlayerRepository implements IPlayerRepository {
  async findByAlias(alias: string): Promise<Player> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .findOne(Player, { where: { alias } }),
        queryRunner
    );
  }

  async delete(id: number): Promise<Player> {
    return Promise.resolve(undefined);
  }

  async findById(id: number): Promise<Player> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .findOne(Player, { where: { id } }),
        queryRunner);
  }

  async save(entity: Player): Promise<Player> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .save(entity),
        queryRunner
    );
  }

  async update(entity: Player): Promise<Player> {
    return Promise.resolve(undefined);
  }

  async findAll(): Promise<Player[]> {
    return Promise.resolve([]);
  }
}
