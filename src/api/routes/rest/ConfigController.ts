import { Router } from "express";
import { Container } from "typedi";
import logger from "@/loaders/logger";
import { GenericError } from "@/api/errors/GenericError";
import PlayerHandler from "@/services/player/PlayerHandler";
import { IConfigHandler } from "@/interfaces/services/IConfigHandler";
import { ConfigHandler } from "@/services/configs/ConfigHandler";
import { IPosition } from "@/interfaces/models/IPosition";

const route = Router();

export class ConfigController {
  private readonly configHandler: IConfigHandler;

  constructor(app: Router) {
    app.use('/config', route);

    this.configHandler = Container.get(ConfigHandler);

    route.post(
        '/',
        async (req, res, next) => {
          try {
            const { positions } = req.body;
            const config = await this.configHandler
                .save(positions as IPosition[]);

            const status = config ? 201 : 500;
            return res.status(status).json(config)
          } catch (e) {
            logger.error(e);
            return next(new GenericError(e.message, e.status || 500));
          }
        });
  }
}
