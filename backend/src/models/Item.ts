import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Category, (category) => category.items, { eager: true })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @Column("decimal")
  price!: number;

  @Column()
  amount_in_stock!: number;

  @Column()
  description!: string;

  @Column()
  image_URL!: string;
}