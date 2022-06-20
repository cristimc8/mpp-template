import { IEntity } from "@/models/IEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Game } from "@/models/Game";

@Entity({ name: 'moves' })
export class Move extends IEntity {
  @Column()
  position: number;

  @Column()
  score: number;

  @Column()
  generatedNo: number;

  @ManyToOne(() => Game, game => game.moves)
  game: Game;
}
