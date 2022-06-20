import * as http from "http";
import { socketsConnection } from "@/config/sockets";
import Logger from "@/loaders/logger";
import config from "@/config/index";
import { SocketServer } from "@/api/routes/sockets/SocketServer";

export const configServer = async ({ app, server }: { app: Express.Application, server: http.Server }) => {

  const ioConnection = await socketsConnection({ expressApp: app, server });

  await require('../loaders').default({ expressApp: app });

  new SocketServer(ioConnection);

  Logger.info('✌️ Sockets loaded');

  Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
};
