// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString} from 'class-validator'

import {TWebsocketChatService} from '@services/websocket-chat-service'

import {
  ChatMessageDataCreatedNewProposalProposalDescriptionContract,
  ChatMessageDataCreatedNewProposalRequestDescriptionContract,
  ChatMessageDataProposalResultEditedContract,
  ChatMessageDataProposalStatusChangedContract,
} from './chat-message-data.contract'

export {ChatMessageType} from '@services/websocket-chat-service'

export type TChatMessageDataUniversal =
  | ChatMessageDataCreatedNewProposalProposalDescriptionContract
  | ChatMessageDataCreatedNewProposalRequestDescriptionContract
  | ChatMessageDataProposalStatusChangedContract
  | ChatMessageDataProposalResultEditedContract
  | undefined

export class ChatMessageContract<T extends TChatMessageDataUniversal = TChatMessageDataUniversal>
  implements TWebsocketChatService.ChatMessage
{
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
  @IsBoolean()
  public isRead!: boolean
  @IsNotEmpty()
  @IsString()
  public text!: string
  @IsNotEmpty()
  @IsEnum(TWebsocketChatService.ChatMessageType)
  public type!: TWebsocketChatService.ChatMessageType
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
  public data!: T
}
