import { Game } from "@/models/Game";
import { Move } from "@/models/Move";

export interface IGameHandler {
  start(alias: string): Promise<Game>;
  move(game: Game): Promise<Move>;
  stop(game: Game): Promise<Game>;
  list(): Promise<Game[]>
}
