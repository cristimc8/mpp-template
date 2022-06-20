import { DataSource } from "typeorm";
import config from "@/config";
import { Player } from "@/models/Player";
import { Game } from "@/models/Game";
import { Config } from "@/models/Config";
import { Position } from "@/models/Position";
import { Move } from "@/models/Move";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.database,
  synchronize: true,
  logging: true,
  entities: [Player, Game, Config, Position, Move],
  subscribers: [],
  migrations: [],
})
