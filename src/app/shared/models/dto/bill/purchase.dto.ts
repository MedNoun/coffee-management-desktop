import { Product } from '../../../../../assets';

export class PurchaseDto {
  constructor(public product: Product, public quantity: number = 1) {}
}
