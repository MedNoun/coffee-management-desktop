import { User } from '../../../../../assets';
import { UserDto } from '../user/user.dto';
import { PurchaseDto } from './purchase.dto';

export class BillDto {
  constructor(
    public user: UserDto = new UserDto(),
    public purchases: PurchaseDto[] = []
  ) {}
}
