import { ProductDto } from '../product/product.dto';

export class CategoryDto {
  categoryName: string = 'Category Name';
  categoryImage: string = '../../../../assets/background.jpg';
  products: Partial<ProductDto>[] = [];
}
