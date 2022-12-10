import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;
  @Column()
  productName: string;
  @Column()
  productImage: string;
  @Column()
  productPrice: number;
  @Column()
  devise: string;
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
