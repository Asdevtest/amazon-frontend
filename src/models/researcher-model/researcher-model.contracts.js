import {IsInt, IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsOptional} from 'class-validator'

import {InlineResponse200, InlineResponse2004, InlineResponse2009} from '@services/rest-api-service/codegen/src'

export class ResearcherProduct extends InlineResponse200 {}

export class ResearcherCheckProductExistResponse extends InlineResponse2009 {}

export class ResearcherPayment extends InlineResponse2004 {}

export class ResearcherCreateProductContract {
  @IsString() lsupplier

  @IsInt() bsr

  @IsInt() amazon

  @IsArray() supplier

  @IsNumber() fbafee

  @IsInt() delivery

  @IsString() icomment

  @IsArray() images

  @IsNumber() reffee
}

export class ResearcherUpdateProductContract {
  @IsNotEmpty()
  @IsString()
  lamazon

  @IsNotEmpty()
  @IsNumber()
  bsr

  @IsNotEmpty()
  @IsBoolean()
  fba

  @IsOptional()
  @IsBoolean()
  express

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsArray()
  supplier

  @IsNotEmpty()
  @IsNumber()
  reffee

  @IsNotEmpty()
  @IsNumber()
  fbafee

  @IsNotEmpty()
  @IsInt()
  delivery

  @IsOptional()
  @IsString()
  fbalink

  @IsNotEmpty()
  @IsInt()
  status

  @IsNotEmpty()
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

  @IsNotEmpty()
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

  @IsOptional()
  @IsString()
  currentSupplier
}
