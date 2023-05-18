import { IsInt, IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator'

import { InlineResponse200, InlineResponse2001 } from '@services/rest-api-service/codegen/src'

export class AdministratorProduct extends InlineResponse200 {}

export class AdministratorUser extends InlineResponse2001 {}

export class AdministratorUpdateProductContract {
  @IsNotEmpty()
  @IsInt()
  lamazon

  @IsNotEmpty()
  @IsString()
  lsupplier

  @IsNotEmpty()
  @IsNumber()
  bsr

  @IsNotEmpty()
  @IsBoolean()
  fba

  @IsNotEmpty()
  @IsNumber()
  amazon

  @IsNotEmpty()
  @IsString()
  supplier

  @IsNotEmpty()
  @IsNumber()
  reffee

  @IsOptional()
  @IsString()
  idicomment
}

export class AdministratorUpdateUserContract {
  @IsNotEmpty()
  @IsString()
  name

  @IsNotEmpty()
  @IsInt()
  role

  @IsNotEmpty()
  @IsString()
  lsupplier

  @IsOptional()
  @IsBoolean()
  fba

  @IsNotEmpty()
  @IsBoolean()
  active

  @IsNotEmpty()
  @IsInt()
  rate
}
