// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { TWebsocketChatService } from '@services/websocket-chat-service'
import { ChatInfoType } from '@services/websocket-chat-service/interfaces'

import {
  ChatMessageDataAddUsersToGroupChatContract,
  ChatMessageDataBloggerProposalResultEditedContract,
  ChatMessageDataCreateNewBloggerProposalContract,
  ChatMessageDataCreateNewDesignerProposalContract,
  ChatMessageDataCreatedNewProposalProposalDescriptionContract,
  ChatMessageDataCreatedNewProposalRequestDescriptionContract,
  ChatMessageDataDesignerProposalResultEditedContract,
  ChatMessageDataProposalResultEditedContract,
  ChatMessageDataProposalStatusChangedContract,
  ChatMessageRemovePatchInfoGroupChatContract,
  ChatMessageRemoveUsersFromGroupChatContract,
} from './chat-message-data.contract'
import { ChatUserContract } from './chat-user.contract'

export { ChatMessageType } from '@services/websocket-chat-service'

export type TChatMessageDataUniversal =
  | ChatMessageDataAddUsersToGroupChatContract
  | ChatMessageDataCreatedNewProposalProposalDescriptionContract
  | ChatMessageDataCreatedNewProposalRequestDescriptionContract
  | ChatMessageDataProposalStatusChangedContract
  | ChatMessageDataProposalResultEditedContract
  | ChatMessageRemoveUsersFromGroupChatContract
  | ChatMessageRemovePatchInfoGroupChatContract
  | ChatMessageDataCreateNewBloggerProposalContract
  | ChatMessageDataBloggerProposalResultEditedContract
  | ChatMessageDataDesignerProposalResultEditedContract
  | ChatMessageDataCreateNewDesignerProposalContract
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
  @IsString({ each: true })
  public images!: string[]
  @IsNotEmpty()
  @IsString({ each: true })
  public files!: string[]
  public video!: string[]
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

  public info!: {
    image: string
    title: string
    type: ChatInfoType
  }

  public crmItemId?: string

  @IsOptional()
  public user?: ChatUserContract
  public users?: ChatUserContract[]
  public humanFriendlyId?: string

  @IsOptional()
  public replyMessageId?: boolean | null

  @IsOptional()
  public offset?: number
  public replyMessage!: ChatMessageContract
}
