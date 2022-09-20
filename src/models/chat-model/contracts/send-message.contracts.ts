/* eslint-disable @typescript-eslint/no-unused-vars */
import {IsBoolean, IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class SendMessageRequestParamsContract {
  @IsNotEmpty()
  @IsString()
  public chatId!: string
  @IsOptional()
  @IsString()
  public text!: string
  @IsOptional()
  @IsString({each: true})
  public images?: string[]
  @IsOptional()
  // @IsString({each: true})
  public files?: File[]
  @IsOptional()
  @IsBoolean()
  public is_draft?: boolean
}
