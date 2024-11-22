import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column("decimal")
  balance!: number;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
