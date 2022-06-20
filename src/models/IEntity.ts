import { PrimaryGeneratedColumn } from "typeorm";

export abstract class IEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
