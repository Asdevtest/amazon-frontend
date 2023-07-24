import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import { InlineObject18, InlineResponse200, InlineResponse2004 } from '@services/rest-api-service/codegen/src'

export class SupervisorProduct extends InlineResponse200 {}

export class SupervisorPayment extends InlineResponse2004 {}

export class SupervisorUpdateProductParams extends InlineObject18 {}

export class SupervisorUpdateProductContract {
  // @IsNotEmpty()
  // @IsString()
  // checkednotes

  @IsOptional()
  @IsString()
  lamazon

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsNumber()
  height

  @IsNotEmpty()
  @IsNumber()
  width

  @IsNotEmpty()
  @IsNumber()
  length

  @IsNotEmpty()
  @IsNumber()
  weight

  @IsOptional()
  @IsArray()
  supplier

  @IsOptional()
  @IsNumber()
  reffee

  @IsOptional()
  @IsNumber()
  fbafee

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

  @IsNotEmpty()
  @IsNumber()
  profit

  @IsNotEmpty()
  @IsNumber()
  margin

  @IsNotEmpty()
  @IsNumber()
  fbaamount
}
