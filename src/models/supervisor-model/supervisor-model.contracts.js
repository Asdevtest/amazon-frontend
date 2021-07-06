import {IsInt, IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray} from 'class-validator'

import {InlineObject18, InlineResponse200, InlineResponse2004} from '@services/rest-api-service/codegen/src'

export class SupervisorProduct extends InlineResponse200 {}

export class SupervisorPayment extends InlineResponse2004 {}

export class SupervisorUpdateProductParams extends InlineObject18 {}

export class SupervisorUpdateProductContract {
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
}
