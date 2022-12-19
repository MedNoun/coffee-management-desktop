import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Product } from './product';
@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;
  @Column()
  image: string;
  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];
}
