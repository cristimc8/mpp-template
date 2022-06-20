import { Game } from "@/models/Game";

/* Mapping the socket id -> Game */
export interface IGameDetails {
  [uid: string]: Game;
}
