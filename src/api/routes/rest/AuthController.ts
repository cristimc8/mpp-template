import { Router } from "express";
import { Container } from "typedi";
import logger from "@/loaders/logger";
import { GenericError } from "@/api/errors/GenericError";
import PlayerHandler from "@/services/player/PlayerHandler";
import { IPlayerHandler } from "@/interfaces/services/IPlayerHandler";

const route = Router();

export class AuthController {
  private readonly playerHandler: IPlayerHandler;

  constructor(app: Router) {
    app.use('/auth', route);

    this.playerHandler = Container.get(PlayerHandler);

    route.post(
        '/',
        async (req, res, next) => {
          try {
            const { alias } = req.body;
            const isOK = await this.playerHandler.signIn(alias);
            const status = isOK ? 200 : 403;
            return res.sendStatus(status);
          } catch (e) {
            logger.error(e);
            return next(new GenericError(e.message, e.status || 500));
          }
        });

    route.post(
        '/create',
        async (req, res, next) => {
          try {
            const { alias, password } = req.body;
            const playerService = Container.get(PlayerHandler);
            const response = await playerService.create({ alias, password });
            if (response) {
              return res.status(201).json(response);
            }
          } catch (e) {
            logger.error(e);
            return next(new GenericError(e.message, e.status || 500));
          }
        }
    );
  }
}
