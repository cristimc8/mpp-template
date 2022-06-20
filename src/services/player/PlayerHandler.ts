import { Inject, Service } from "typedi";
import { EventDispatcher, EventDispatcherInterface } from "@/decorators/eventDispatcher";
import { PlayerRepository } from "@/persistence/PlayerRepository";
import { IPlayerRepository } from "@/interfaces/repositories/IPlayerRepository";
import { Player } from "@/models/Player";
import { IPlayer } from "@/interfaces/models/IPlayer";
import { GenericError } from "@/api/errors/GenericError";
import { IPlayerHandler } from "@/interfaces/services/IPlayerHandler";

@Service()
export default class PlayerHandler implements IPlayerHandler {
  private playerRepo: IPlayerRepository;

  constructor(
      @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
      @Inject('logger') private logger
  ) {
    this.playerRepo = new PlayerRepository();
  }

  public async signIn(alias: string): Promise<boolean> {
    let player: Player;
    try {
      player = await this.playerRepo.findByAlias(alias);
    } catch (e) {
      throw new Error(e);
    }
    const validPassword = player?.alias === alias;
    if (validPassword) {
      this.logger.info('Alias is valid!');
      return true;
    } else {
      throw new GenericError('Invalid password', 403);
    }
  }

  public async create(player: Partial<IPlayer>): Promise<Partial<IPlayer>> {
    const playerInstance = new Player();
    playerInstance.alias = player.alias;
    playerInstance.password = player.password;
    try {
      const response = await this.playerRepo.save(
          playerInstance
      );
      if (response) {
        return {
          alias: response.alias,
          id: response.id
        };
      }
      throw new GenericError(`User with alias ${player.alias} already exists!`, 409);
    } catch (e) {
      throw new GenericError(e.message, e.status || 500);
    }
  }
}
