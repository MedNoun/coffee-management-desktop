import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';
import { User } from './user';

@Entity()
export class Purchase {
  @PrimaryColumn({ type: 'int', name: 'bill_id' })
  @ManyToOne(() => Bill, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;
  @PrimaryColumn({ type: 'int', name: 'product_id' })
  @ManyToOne(() => Product, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @Column()
  quantity: number;
  @Column()
  timestamp: Date = new Date();
}

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
  @OneToMany(() => Purchase, (purchase) => purchase.bill)
  purchases: Purchase[];

  @Column({ default: false })
  synced: boolean;
}
