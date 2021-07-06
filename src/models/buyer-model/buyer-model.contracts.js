import {IsInt, IsString, IsNotEmpty, IsBoolean, IsArray, IsOptional, IsNumber} from 'class-validator'

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

export class BuyerUpdateProductContract {
  @IsNotEmpty()
  @IsInt()
  status

  @IsOptional()
  @IsString()
  checkednotes

  @IsOptional()
  @IsString()
  lamazon

  @IsOptional()
  @IsNumber()
  bsr

  @IsOptional()
  @IsBoolean()
  fba

  @IsOptional()
  @IsBoolean()
  express

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
  supplier

  @IsOptional()
  @IsInt()
  reffee

  @IsOptional()
  @IsNumber()
  fbafee

  @IsOptional()
  @IsInt()
  delivery

  @IsOptional()
  @IsString()
  fbalink

  @IsOptional()
  @IsInt()
  status

  @IsOptional()
  @IsString()
  icomment

  @IsOptional()
  @IsArray()
  images

  @IsOptional()
  @IsString()
  amazonDescription

  @IsOptional()
  @IsString()
  amazonDetail

  @IsOptional()
  @IsString()
  amazonTitle

  @IsOptional()
  @IsNumber()
  minpurchase

  @IsOptional()
  @IsInt()
  profit

  @IsOptional()
  @IsNumber()
  margin

  @IsOptional()
  @IsString()
  buyerscomment
}

export class BuyerUpdateOrderContract {
  @IsOptional()
  @IsString()
  buyerscomment

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

// похоже, это не нужно т.к.это заполняется не из полей
// export class BuyerPostTaskContract {
//   @IsNotEmpty()
//   @IsInt()
//   taskId;

//   @IsNotEmpty()
//   @IsArray()
//   boxes;

//   @IsNotEmpty()
//   @IsString()
//   operationType;
// }

export class BuyerAddOwnProductContract {
  @IsNotEmpty()
  @IsString()
  amazonTitle

  @IsNotEmpty()
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
