import { Container } from 'typedi';
import LoggerInstance from './logger';
import PlayerHandler from "@/services/player/PlayerHandler";
import { GameHandler } from "@/services/game/GameHandler";
import { ConfigHandler } from "@/services/configs/ConfigHandler";

export default () => {
    Container.set('logger', LoggerInstance);
    Container.set('PlayerHandler', PlayerHandler);
    Container.set('GameHandler', GameHandler);
    Container.set('ConfigHandler', ConfigHandler);
};
