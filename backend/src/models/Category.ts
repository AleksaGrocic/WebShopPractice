import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Item, (item) => item.category)
  items!: Item[];
}
