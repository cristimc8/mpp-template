import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { IEntity } from "@/models/IEntity";
import { Game } from "@/models/Game";

@Entity({ name: 'players' })
export class Player extends IEntity {
  @Column({ unique: true })
  alias: string;

  @Column()
  password: string;

  @OneToMany(() => Game, game => game.player)
  games: Game[];
}
