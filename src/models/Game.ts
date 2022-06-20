import { Player } from "@/models/Player";
import { Config } from "@/models/Config";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { IEntity } from "@/models/IEntity";
import { Move } from "@/models/Move";
import { constants } from "@/constants/Constants";

@Entity({ name: 'games' })
export class Game extends IEntity {
  @ManyToOne(() => Player, player => player.games, {
    eager: true,
    nullable: false
  })
  player: Player;

  @ManyToOne(() => Config, config => config.games, {
    eager: true,
    nullable: false
  })
  config: Config;

  @OneToMany(() => Move, move => move.game, {
    eager: true,
    onDelete: "CASCADE"
  })
  moves: Move[];

  @Column({
    default: constants.START_SCORE
  })
  score: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  started: Date;

  @Column({
    type: "timestamp",
    nullable: true
  })
  ended: Date;
}
