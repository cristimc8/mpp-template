import { Router } from "express";
import { Container } from "typedi";
import logger from "@/loaders/logger";
import { GenericError } from "@/api/errors/GenericError";
import { IPosition } from "@/interfaces/models/IPosition";
import { IGameHandler } from "@/interfaces/services/IGameHandler";
import { GameHandler } from "@/services/game/GameHandler";

const route = Router();

export class GameController {
  private readonly gameHandler: IGameHandler;

  constructor(app: Router) {
    app.use('/games', route);

    this.gameHandler = Container.get(GameHandler);

    route.get(
        '/',
        async (req, res, next) => {
          try {
            const games = (await this.gameHandler.list())
                .sort((a, b) => b.score - a.score);
            return res.status(200).json(games);
          } catch (e) {
            logger.error(e);
            return next(new GenericError(e.message, e.status || 500));
          }
        });

    route.get(
        '/:alias',
        async (req, res, next) => {
          try {
            const games = (await this.gameHandler.list())
                .filter((game) => game.player.alias === req.params.alias)
                .sort((a, b) => b.score - a.score);
            return res.status(200).json(games);
          } catch (e) {
            logger.error(e);
            return next(new GenericError(e.message, e.status || 500));
          }
        }
    );
  }
}
