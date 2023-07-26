import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import {
  InlineResponse200,
  InlineResponse2002,
  InlineResponse2003,
  InlineResponse2004,
} from '@services/rest-api-service/codegen/src'

export class BuyerProduct extends InlineResponse200 {}

export class BuyerOrder extends InlineResponse2002 {}

export class BuyerBox extends InlineResponse2003 {}

export class BuyerPayment extends InlineResponse2004 {}

export class BuyerUpdateOrderContract {
  @IsOptional()
  @IsString()
  buyersComment

  @IsNotEmpty()
  @IsInt()
  warehouse

  @IsNotEmpty()
  @IsBoolean()
  fba

  @IsNotEmpty()
  @IsInt()
  status

  @IsNotEmpty()
  @IsInt()
  deliveryCostToTheWarehouse

  @IsOptional()
  @IsArray()
  images
}

export class BuyerAddOwnProductContract {
  @IsNotEmpty()
  @IsString()
  amazonTitle

  @IsOptional()
  @IsString()
  lamazon

  @IsOptional()
  @IsArray()
  images

  @IsOptional()
  @IsNumber()
  amazon

  @IsOptional()
  @IsNumber()
  height

  @IsOptional()
  @IsNumber()
  width

  @IsOptional()
  @IsNumber()
  length

  @IsOptional()
  @IsNumber()
  weight

  @IsOptional()
  @IsArray()
  providers

  @IsOptional()
  @IsString()
  buyerscomment
}

export class BuyerAddOrEditSubUserContract {
  @IsNotEmpty()
  @IsString()
  email

  @IsNotEmpty()
  @IsString()
  password

  @IsNotEmpty()
  @IsString()
  secondPassword

  @IsNotEmpty()
  @IsArray()
  options
}
