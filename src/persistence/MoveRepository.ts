import { IMoveRepository } from "@/interfaces/repositories/IMoveRepository";
import { Move } from "@/models/Move";
import { transactionWrapper } from "@/persistence/handler";
import { AppDataSource } from "@/data-source";

export class MoveRepository implements IMoveRepository {
  delete(id: number): Promise<Move> {
    return Promise.resolve(undefined);
  }

  findById(id: number): Promise<Move> {
    return Promise.resolve(undefined);
  }

  save(entity: Move): Promise<Move> {
    const queryRunner = AppDataSource.createQueryRunner();

    return transactionWrapper(() => queryRunner
            .manager
            .save(entity),
        queryRunner
    );
  }

  update(entity: Move): Promise<Move> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Move[]> {
    return Promise.resolve([]);
  }
}
