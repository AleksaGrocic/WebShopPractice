import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Item, (item) => item.id)
  @JoinColumn({ name: "items" })
  items!: Item[];
}
