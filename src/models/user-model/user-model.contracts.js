import {IsString, IsNotEmpty, IsEmail, Length} from 'class-validator'

import {InlineResponse2007, InlineResponse2011} from '@services/rest-api-service/codegen/src'

export class UserSignInDataContract extends InlineResponse2011 {}

export class UserInfoContract extends InlineResponse2007 {}

export class UserRegistrationContract {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name

  @IsNotEmpty()
  @IsEmail()
  email

  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password
}
