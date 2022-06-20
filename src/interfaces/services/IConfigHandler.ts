import { Config } from "@/models/Config";
import { IPosition } from "@/interfaces/models/IPosition";

export interface IConfigHandler {
  save(positions: IPosition[]): Promise<Config>
}
