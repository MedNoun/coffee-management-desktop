import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number = 0;
  @Column()
  categoryName: string = 'Category Name';
  @Column()
  categoryImage: string = '../../../../assets/background.jpg';
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
