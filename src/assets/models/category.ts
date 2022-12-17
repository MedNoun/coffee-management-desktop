import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Product } from './product';
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image: string;
  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  products: Product[];
}
