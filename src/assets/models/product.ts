import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: Number;
  @Column()
  productName: String;
  @Column()
  productImage: String;
  @Column()
  productPrice: number;
  @Column()
  devise: string;
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
