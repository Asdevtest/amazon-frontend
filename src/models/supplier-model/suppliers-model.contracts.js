import { IsInt, IsNotEmpty, IsString } from 'class-validator'

import { InlineResponse20013 } from '@services/rest-api-service/codegen/src'

export class Supplier extends InlineResponse20013 {}

export class SupplierAddSuplierContract {
  @IsNotEmpty()
  @IsString()
  name

  @IsNotEmpty()
  @IsString()
  link

  @IsNotEmpty()
  @IsInt()
  price

  @IsNotEmpty()
  @IsInt()
  delivery

  @IsNotEmpty()
  @IsInt()
  amount

  @IsNotEmpty()
  @IsInt()
  minlot

  @IsNotEmpty()
  @IsInt()
  lotcost

  @IsNotEmpty()
  @IsString()
  comment
}

export class SupplierUpdateSuplierContract {
  @IsNotEmpty()
  @IsString()
  name

  @IsNotEmpty()
  @IsString()
  link

  @IsNotEmpty()
  @IsInt()
  price

  @IsNotEmpty()
  @IsInt()
  delivery

  @IsNotEmpty()
  @IsInt()
  amount

  @IsNotEmpty()
  @IsInt()
  minlot

  @IsNotEmpty()
  @IsInt()
  lotcost

  @IsNotEmpty()
  @IsString()
  comment
}
