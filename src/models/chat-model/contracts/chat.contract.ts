import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { TWebsocketChatService } from '@services/websocket-chat-service'

import { ChatMessageContract } from './chat-message.contract'
import { ChatUserContract } from './chat-user.contract'

export class ChatContract implements TWebsocketChatService.Chat {
  @IsNotEmpty()
  @IsString()
  public _id!: string
  @IsOptional()
  @IsString()
  public crmItemId?: string
  @IsOptional()
  @IsString()
  public crmItemType?: string
  @IsOptional()
  @IsBoolean()
  public isBlocked!: boolean
  @IsOptional()
  @IsString()
  public blockedById?: string
  @IsOptional()
  @IsBoolean()
  public isActual?: boolean
  @IsNotEmpty()
  @IsString()
  public lastUpdatedById!: string
  @IsNotEmpty()
  @IsString()
  public createdAt!: string
  @IsNotEmpty()
  @IsString()
  public updatedAt!: string
  @IsNotEmpty()
  @IsString()
  public type!: string
  @IsNotEmpty()
  @IsString()
  public lastUpdatedBy!: { [x: string]: unknown; _id: string }
  @IsNotEmpty()
  @Type(() => ChatUserContract)
  public users!: ChatUserContract[]
  @IsNotEmpty()
  @Type(() => ChatMessageContract)
  public messages!: ChatMessageContract[]
  @IsOptional()
  public info?: { image: string; title: string; createdBy?: string }
  @IsNotEmpty()
  public pagination!: { limit: number; offset: number; offsetBottom: number }
  @IsOptional()
  @IsString()
  unread!: string
  @IsBoolean()
  public isAllNextMessagesLoaded!: boolean
  public isAllPreviousMessagesLoaded!: boolean
  public lastMessage?: ChatMessageContract
  public messagesCount?: number
}
