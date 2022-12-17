import { ProductDto } from '../product/product.dto';

export class CategoryDto {
  name: string = 'Category Name';
  image: string = '../../../../assets/background.jpg';
  products: Partial<ProductDto>[] = [];
}
