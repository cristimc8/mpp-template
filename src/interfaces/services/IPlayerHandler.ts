import { IPlayer } from "@/interfaces/models/IPlayer";

export interface IPlayerHandler {
  signIn(alias: string): Promise<boolean>;
  create(player: Partial<IPlayer>): Promise<Partial<IPlayer>>
}
