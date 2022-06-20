import { Router } from 'express';
import { AuthController } from "@/api/routes/rest/AuthController";
import { ConfigController } from "@/api/routes/rest/ConfigController";
import { GameController } from "@/api/routes/rest/GameController";

// REST
export default () => {
  const app = Router();
  new AuthController(app);
  new ConfigController(app);
  new GameController(app);

  return app
}
