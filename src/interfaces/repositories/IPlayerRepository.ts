import { ICrudRepository } from "@/interfaces/repositories/ICrudRepository";
import { Player } from "@/models/Player";

export interface IPlayerRepository extends ICrudRepository<Player>{
  findByAlias(alias: string): Promise<Player>;
}
