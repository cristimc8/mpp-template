import { IGameHandler } from "@/interfaces/services/IGameHandler";
import { Move } from "@/models/Move";
import { Game } from "@/models/Game";
import { IPlayerRepository } from "@/interfaces/repositories/IPlayerRepository";
import { EventDispatcher, EventDispatcherInterface } from "@/decorators/eventDispatcher";
import { Inject, Service } from "typedi";
import { PlayerRepository } from "@/persistence/PlayerRepository";
import { IGameRepository } from "@/interfaces/repositories/IGameRepository";
import { GameRepository } from "@/persistence/GameRepository";
import { IMoveRepository } from "@/interfaces/repositories/IMoveRepository";
import { MoveRepository } from "@/persistence/MoveRepository";
import { GenericError } from "@/api/errors/GenericError";
import { Config } from "@/models/Config";
import { IConfigRepository } from "@/interfaces/repositories/IConfigRepository";
import { ConfigRepository } from "@/persistence/ConfigRepository";
import { constants } from "@/constants/Constants";
import logger from "@/loaders/logger";
import { rand } from "@/utils";

@Service()
export class GameHandler implements IGameHandler {
  private playerRepo: IPlayerRepository;
  private gameRepo: IGameRepository;
  private moveRepo: IMoveRepository;
  private configRepo: IConfigRepository;

  constructor(
      @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
      @Inject('logger') private logger
  ) {
    this.playerRepo = new PlayerRepository();
    this.gameRepo = new GameRepository();
    this.moveRepo = new MoveRepository();
    this.configRepo = new ConfigRepository();
  }

  async move(game: Game): Promise<Move> {
    const move = new Move();
    move.generatedNo = Math.floor(rand(1, constants.MAX_DICE + 1));

    const prevMove = game.moves?.at(-1);
    const lastPosition = prevMove ? prevMove.position : 0;

    move.position = (lastPosition + move.generatedNo) % constants.CONFIG_SIZE;

    const alreadyHit = game.moves.some(
        (prev) => prev.position === move.position
    );

    if (alreadyHit) {
      move.score = prevMove.score;
    } else {
      move.score = (game.moves
              ?.at(-1)
              ?.score ?? constants.START_SCORE)
          - game.config.positions.at(move.position).value;
    }

    if (lastPosition > move.position) {
      move.score += constants.REWARD_SCORE;
    }
    const createdMove = await this.moveRepo.save(move);
    game.moves.push(move);
    game.score = move.score;
    await this.gameRepo.save(game);
    return createdMove;
  }

  async start(alias: string): Promise<Game> {
    const game = new Game();

    const player = await this.playerRepo.findByAlias(alias);
    if (!player) {
      throw new GenericError(`No player found with alias ${alias}!`, 404);
    }

    game.player = player;
    game.config = await this.getRandomConfig();
    const createdGame = await this.gameRepo.save(game);
    return this.gameRepo.findById(createdGame.id);
  }

  async stop(game: Game): Promise<Game> {
    return game;
  }

  async list(): Promise<Game[]> {
    return this.gameRepo.findAll();
  }

  private async getRandomConfig(): Promise<Config> {
    const configs = await this.configRepo.findAll();
    return configs.at(Math.floor(rand(0, configs.length)));
  }
}
