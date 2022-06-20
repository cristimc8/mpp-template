import { Column, Entity, ManyToMany } from "typeorm";
import { IEntity } from "@/models/IEntity";
import { Config } from "@/models/Config";

@Entity({name: 'positions'})
export class Position extends IEntity {
  @Column()
  value: number;

  @ManyToMany(() => Config, config => config.positions, {
    onDelete: "CASCADE"
  })
  config: Config;
}
