import { Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { IEntity } from "@/models/IEntity";
import { Game } from "@/models/Game";
import { Position } from "@/models/Position";

@Entity({ name: 'configs' })
export class Config extends IEntity {
  @OneToMany(() => Game, game => game.config, {
    onDelete: "CASCADE",
  })
  games: Game;

  @ManyToMany(() => Position, position => position.config, {
    eager: true
  })
  @JoinTable()
  positions: Position[];
}
