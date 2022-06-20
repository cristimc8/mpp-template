import { IPositionsRepository } from "@/interfaces/repositories/IPositionsRepository";
import { Position } from "@/models/Position";
import { AppDataSource } from "@/data-source";
import { transactionWrapper } from "@/persistence/handler";

export class PositionsRepository implements IPositionsRepository {
  findByValue(value: number): Promise<Position> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .findOneBy(Position, { value }),
        queryRunner);
  }

  findAll(): Promise<Position[]> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .find(Position),
        queryRunner);
  }

  delete(id: number): Promise<Position> {
    return Promise.resolve(undefined);
  }

  findById(id: number): Promise<Position> {
    return Promise.resolve(undefined);
  }

  save(entity: Position): Promise<Position> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .save(entity),
        queryRunner);
  }

  update(entity: Position): Promise<Position> {
    return Promise.resolve(undefined);
  }
}
