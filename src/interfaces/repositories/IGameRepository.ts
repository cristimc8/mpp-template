import { ICrudRepository } from "@/interfaces/repositories/ICrudRepository";
import { Game } from "@/models/Game";

export interface IGameRepository extends ICrudRepository<Game> {
}
