import {IsBoolean, IsNotEmpty, IsOptional, IsString} from 'class-validator'

import {TWebsocketChatService} from '@services/websocket-chat-service'

export class ChatMessageContract implements TWebsocketChatService.ChatMessage {
  @IsNotEmpty()
  @IsString()
  public _id!: string
  @IsNotEmpty()
  @IsString()
  public userId!: string
  @IsNotEmpty()
  @IsString()
  public chatId!: string
  @IsNotEmpty()
  @IsString()
  public text!: string
  @IsNotEmpty()
  @IsString()
  public type!: string
  @IsNotEmpty()
  @IsString({each: true})
  public images!: string[]
  @IsNotEmpty()
  @IsString({each: true})
  public files!: string[]
  @IsOptional()
  @IsBoolean()
  public is_draft?: boolean
  @IsNotEmpty()
  @IsString()
  public createdAt!: string
  @IsNotEmpty()
  @IsString()
  public updatedAt!: string
  @IsOptional()
  public data?: {price: string; execution_time: number; status: string; title?: string; timeoutAt?: string}
}
