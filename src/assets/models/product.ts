import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number = 0;
  @Column()
  productName: string = 'Product';
  @Column()
  description: string = 'haja bnina barcha';
  @Column()
  productImage: string = '../../../../assets/background.jpg';
  @Column()
  productPrice: number = 5;
  @Column()
  devise: string = 'Dolar';
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
