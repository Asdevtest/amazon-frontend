import {IsBoolean, IsNotEmpty, IsOptional, IsString} from 'class-validator'

import {SendMessageRequestParams} from '@services/websocket-chat-service/interfaces'

export class SendMessageRequestParamsContract implements SendMessageRequestParams {
  @IsNotEmpty()
  @IsString()
  public chatId!: string
  @IsNotEmpty()
  @IsString()
  public text!: string
  @IsOptional()
  @IsString({each: true})
  public images?: string[]
  @IsOptional()
  @IsString({each: true})
  public files?: string[]
  @IsOptional()
  @IsBoolean()
  public is_draft?: boolean
}
