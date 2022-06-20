import { ICrudRepository } from "@/interfaces/repositories/ICrudRepository";
import { Position } from "@/models/Position";

export interface IPositionsRepository extends ICrudRepository<Position> {
  findByValue(value: number): Promise<Position>;
}
