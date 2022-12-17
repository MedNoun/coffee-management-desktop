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
import { Bill } from './bill';
import { Product } from './product';

@Entity()
export class Purchase extends BaseEntity {
  @PrimaryColumn({ type: 'int', name: 'billId' })
  @ManyToOne(() => Bill, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'billId' })
  bill: Bill;
  @PrimaryColumn({ type: 'int', name: 'productId' })
  @ManyToOne(() => Product, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
  @Column()
  quantity: number;
}
