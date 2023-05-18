import { IsInt, IsString, IsNotEmpty, IsArray, IsOptional, IsNumber } from 'class-validator'

import {
  ApiV1AdminsGetNotPaidProductsCreatedby,
  InlineResponse200,
  InlineResponse2002,
  InlineResponse2006,
  InlineResponse2008,
  InlineResponse201,
} from '@services/rest-api-service/codegen/src'

export class ClientProduct extends InlineResponse200 {}

export class ClientOrder extends InlineResponse2002 {}

export class ClientCreateOrderResponse extends InlineResponse201 {}

export class ClientUser extends ApiV1AdminsGetNotPaidProductsCreatedby {}

export class ClientBox extends InlineResponse2006 {}

export class ClientBatches extends InlineResponse2008 {}

export class ClientUpdateOrderContract {
  @IsOptional()
  @IsString()
  clientComment

  @IsNotEmpty()
  @IsInt()
  warehouse

  @IsNotEmpty()
  @IsInt()
  deliveryMethod

  @IsNotEmpty()
  @IsInt()
  amount

  @IsNotEmpty()
  @IsInt()
  status

  @IsNotEmpty()
  @IsString()
  barCode

  @IsOptional()
  @IsArray()
  images
}

export class ClientAddOwnProductContract {
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

export class ClientAddOrEditSubUserContract {
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
