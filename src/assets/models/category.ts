import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;
  @Column()
  categoryName: string;
  @Column()
  categoryImage: string;
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
  @Column({ default: false })
  synced: boolean;
}
