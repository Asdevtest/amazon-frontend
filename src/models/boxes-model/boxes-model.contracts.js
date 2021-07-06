import {Type} from 'class-transformer'
import {IsInt, IsString, IsNotEmpty, IsArray, ValidateNested} from 'class-validator'

class BoxesCreateBoxItemContract {
  @IsNotEmpty()
  @IsString()
  product

  @IsNotEmpty()
  @IsInt()
  amount

  @IsNotEmpty()
  @IsString()
  order
}

export class BoxesCreateBoxContract {
  @IsNotEmpty()
  @IsString()
  clientId

  @IsNotEmpty()
  @IsInt()
  deliveryMethod

  @ValidateNested()
  @IsArray()
  @Type(() => BoxesCreateBoxItemContract)
  items
}

// class BoxesArrayCreateBoxesItemContract {
//   @ValidateNested()
//   @IsArray()
//   @Type(() => BoxesCreateBoxItemContract)
//   Array; // не ясно, что тут использовать
// }

// export class BoxesSplitBoxContract {
// совсем тут запутался, стоит ли тут делать валидацию?
// клиент меняет только количество товара

//   @ValidateNested()
//   @IsArray()
//   @Type(() => BoxesArrayCreateBoxesItemContract)
//   itemsBoxSet; // это массив массивов с коробками
// }

export class BoxesUpdateBoxContract {
  @IsNotEmpty()
  @IsString()
  clientId

  @IsNotEmpty()
  @IsInt()
  deliveryMethod

  @ValidateNested()
  @IsArray()
  @Type(() => BoxesCreateBoxItemContract)
  items
}
