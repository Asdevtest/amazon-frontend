import {IsInt, IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsOptional} from 'class-validator'

import {
  InlineResponse200,
  InlineResponse20010,
  InlineResponse2004,
  InlineResponse2009,
} from '@services/rest-api-service/codegen/src'

export class ResearcherProduct extends InlineResponse200 {}

export class ResearcherCheckProductExistResponse extends InlineResponse2009 {}

export class ResearcherProductExternalResponse extends InlineResponse20010 {}

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

  //  те что ниже есть в документации,
  //  но в метод мы передаем только те что выше
  // @IsNotEmpty()
  // @IsString()
  // id;

  // @IsNotEmpty()
  // @IsString()
  // lamazon;

  // @IsNotEmpty()
  // @IsString()
  // currentSupplier;

  // @IsNotEmpty()
  // @IsString()
  // category;

  // @IsNotEmpty()
  // @IsInt()
  // status;

  // @IsNotEmpty()
  // @IsNumber()
  // byboxprice;
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
  @IsInt()
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

  @IsNotEmpty()
  @IsNumber()
  minpurchase

  @IsNotEmpty()
  @IsInt()
  profit

  @IsNotEmpty()
  @IsNumber()
  margin

  // @IsNotEmpty()
  // @IsString()
  // category;

  // @IsNotEmpty()
  // @IsString()
  // sku;

  // @IsNotEmpty()
  // @IsString()
  // material;

  // @IsNotEmpty()
  // @IsString()
  // currentSupplier;

  // @IsNotEmpty()
  // @IsString()
  // barCode;

  // @IsNotEmpty()
  // @IsInt()
  // byboxprice;
}
