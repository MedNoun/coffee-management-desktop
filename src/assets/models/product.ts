import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Category } from './category';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  price: number;
  @Column()
  unit: string;
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
