import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Logger from "@/loaders/logger";
import { IGameDetails } from "@/interfaces/models/IGameDetails";
import { IPlayerHandler } from "@/interfaces/services/IPlayerHandler";
import { IGameHandler } from "@/interfaces/services/IGameHandler";
import { Container } from "typedi";
import PlayerHandler from "@/services/player/PlayerHandler";
import { GameHandler } from "@/services/game/GameHandler";
import { ISockRequest } from "@/interfaces/models/ISockRequest";
import { constants } from "@/constants/Constants";
import { Game } from "@/models/Game";

export class SocketServer {
  private readonly playerHandler: IPlayerHandler;
  private readonly gameHandler: IGameHandler;

  private gameDetails: IGameDetails = {};

  constructor(private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    this.playerHandler = Container.get(PlayerHandler);
    this.gameHandler = Container.get(GameHandler);

    io.on('connection', async (socket) => {
      Logger.info(`Connected client -> ${socket.id}`);

      // force to get leaderboard
      this.io.emit(
          'leaderboard',
          await this.gameHandler.list()
      )

      socket.on('disconnect', () => {
        Logger.info(`Disconnected client -> ${socket.id}`);
        delete this.gameDetails[socket.id];
      });

      socket.on('start', async (data: ISockRequest) => {
        const game = await this.gameHandler.start(data.alias);
        this.playerStart(socket, game);
        delete game.player.password;
        io.to(socket.id).emit('config', game);
      });

      socket.on('move', async () => {
        const move = await this.gameHandler.move(this.gameDetails[socket.id]);
        io.to(socket.id).emit('move', move);
        return this.playerMakeAStep(socket);
      });
    });
  }

  private gameEnded(sid): boolean {
    return this.gameDetails[sid].moves.length === constants.MAX_STEPS;
  }

  private playerStart(
      socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
      game: Game
  ) {
    this.gameDetails[socket.id] = game;
  }

  private playerMakeAStep(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    if (this.gameEnded(socket.id)) {
      return this.playerStop(socket);
    }
  }

  private async playerStop(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    // Tell user he's done
    this.io.to(socket.id).emit(
        'end',
        this.gameHandler.stop(this.gameDetails[socket.id])
    );
    this.io.emit(
        'leaderboard',
        await this.gameHandler.list()
    )
  }
}
