import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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
