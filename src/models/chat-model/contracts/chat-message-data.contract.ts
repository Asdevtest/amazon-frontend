import {Type} from 'class-transformer'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

import {TWebsocketChatService} from '@services/websocket-chat-service'

export class ChatMessageDataCreatedNewProposalProposalDescriptionContract
  implements TWebsocketChatService.ChatMessageDataCreatedNewProposalProposalDescription
{
  @IsNotEmpty()
  @IsString()
  public _id!: string
  @IsNotEmpty()
  @IsNumber()
  public execution_time!: number
  @IsNotEmpty()
  @IsNumber()
  public price!: number
  @IsNotEmpty()
  @IsString()
  public comment!: string
  @IsNotEmpty()
  @IsString()
  public status!: string
}

export class ChatMessageDataCreatedNewProposalRequestDescriptionContract
  implements TWebsocketChatService.ChatMessageDataCreatedNewProposalRequestDescription
{
  @IsNotEmpty()
  @IsString()
  public _id!: string
  @IsNotEmpty()
  @IsString()
  public title!: string
  @IsNotEmpty()
  @IsString()
  public timeoutAt!: string
  @IsNotEmpty()
  @IsString()
  public status!: string
  @IsNotEmpty()
  @IsString()
  public price!: string
}

export class ChatMessageDataProposalStatusChangedContract
  implements TWebsocketChatService.ChatMessageDataProposalStatusChanged
{
  @IsNotEmpty()
  @IsString()
  public status!: string
}

export class ChatMessageDataProposalResultEditedDetailsContract
  implements TWebsocketChatService.ChatMessageDataProposalResultEditedDetails
{
  @IsNotEmpty()
  @IsString({each: true})
  public linksToMediaFiles!: string[]
  @IsNotEmpty()
  @IsString()
  public result!: string
}
