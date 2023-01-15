import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Bill } from './bill';
import { Product } from './product';

@Entity()
export class Purchase extends BaseEntity {
  @ManyToOne(() => Bill, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'billId' })
  bill: Bill;
  @ManyToOne(() => Product, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
  @Column()
  quantity: number;
}
