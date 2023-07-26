// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { TWebsocketChatService } from '@services/websocket-chat-service'

export class ChatUserContract implements TWebsocketChatService.ChatUser {
  @IsNotEmpty()
  @IsString()
  public _id!: string;
  [x: string]: unknown

  @IsOptional()
  @IsString()
  public name?: string
}
