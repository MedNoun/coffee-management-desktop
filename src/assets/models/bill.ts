import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Product } from './product';
import { Purchase } from './purchase';
import { User } from './user';

@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;
  @OneToMany(() => Purchase, (purchase) => purchase.bill)
  purchases: Purchase[];
}
