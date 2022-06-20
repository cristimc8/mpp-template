import { IConfigRepository } from "@/interfaces/repositories/IConfigRepository";
import { Config } from "@/models/Config";
import { AppDataSource } from "@/data-source";
import { transactionWrapper } from "@/persistence/handler";

export class ConfigRepository implements IConfigRepository {
  delete(id: number): Promise<Config> {
    return Promise.resolve(undefined);
  }

  findById(id: number): Promise<Config> {
    return Promise.resolve(undefined);
  }

  save(entity: Config): Promise<Config> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .save(entity),
        queryRunner
    );
  }

  update(entity: Config): Promise<Config> {
    return Promise.resolve(undefined);
  }

  async findAll(): Promise<Config[]> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .find(Config),
        queryRunner);
  }
}
