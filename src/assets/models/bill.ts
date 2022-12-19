import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Purchase } from './purchase';
import { User } from './user';

@Entity()
export class Bill extends BaseEntity {
  @ManyToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;
  @OneToMany(() => Purchase, (purchase) => purchase.bill, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  purchases: Purchase[];
}
