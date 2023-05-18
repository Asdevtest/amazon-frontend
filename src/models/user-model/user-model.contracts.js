import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

import { InlineResponse2007, InlineResponse2011 } from '@services/rest-api-service/codegen/src'

export class UserSignInDataContract extends InlineResponse2011 {}

export class UserInfoContract extends InlineResponse2007 {}

export class UserRegistrationContract {
  @IsNotEmpty()
  @IsString()
  name

  @IsNotEmpty()
  @IsEmail()
  email

  @IsNotEmpty()
  @IsString()
  password
}
