import { IConfigHandler } from "@/interfaces/services/IConfigHandler";
import { Inject, Service } from "typedi";
import { IPosition } from "@/interfaces/models/IPosition";
import { Config } from "@/models/Config";
import { EventDispatcher, EventDispatcherInterface } from "@/decorators/eventDispatcher";
import { IConfigRepository } from "@/interfaces/repositories/IConfigRepository";
import { ConfigRepository } from "@/persistence/ConfigRepository";
import { Position } from "@/models/Position";
import { IPositionsRepository } from "@/interfaces/repositories/IPositionsRepository";
import { PositionsRepository } from "@/persistence/PositionsRepository";
import { GenericError } from "@/api/errors/GenericError";

@Service()
export class ConfigHandler implements IConfigHandler {

  private configRepo: IConfigRepository;
  private positionsRepo: IPositionsRepository;

  constructor(
      @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
      @Inject('logger') private logger
  ) {
    this.configRepo = new ConfigRepository();
    this.positionsRepo = new PositionsRepository();
  }

  async save(positions: IPosition[]): Promise<Config> {
    if (!ConfigHandler.positionsValid(positions)) {
      throw new GenericError('Positions for config not valid!', 400);
    }

    const actualPositions: Position[] = [];

    for (let i = 0; i < positions.length; i++) {
      try {
        const actual = new Position();
        actual.value = positions[i].value;
        const created = await this.positionsRepo.save(actual);
        actualPositions.push(created);
      } catch (e) {
        throw new GenericError('Error while saving new position!', 404);
      }
    }

    const config = new Config();
    config.positions = actualPositions;

    return this.configRepo.save(config);
  }

  private static positionsValid(positions: IPosition[]) {
    return positions.length === 5 &&
        !(positions
            .map((v) => v.value)
            .some(
            (val, index, arr) => arr.indexOf(val) !== index
        ));
  }
}
