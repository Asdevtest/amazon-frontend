import {Type} from 'class-transformer'
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'

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

export class ChatMessageDataCreatedNewProposalRequestDescriptionDetailsContract
  implements TWebsocketChatService.ChatMessageDataCreatedNewProposalRequestDescriptionDetails
{
  @IsNotEmpty()
  @IsString()
  public conditions!: string
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
  @Type(() => ChatMessageDataCreatedNewProposalRequestDescriptionDetailsContract)
  public details!: ChatMessageDataCreatedNewProposalRequestDescriptionDetailsContract
}

export class ChatMessageDataProposalStatusChangedContract
  implements TWebsocketChatService.ChatMessageDataProposalStatusChanged
{
  @IsNotEmpty()
  @IsString()
  public status!: string
  @IsNotEmpty()
  @IsString()
  public reason!: string
  @IsNotEmpty()
  @IsString({each: true})
  public linksToMediaFiles!: string[]
  @IsOptional()
  @IsNumber()
  public timeLimitInMinutes?: number
}

export class ChatMessageDataProposalResultEditedRequestContract
  implements TWebsocketChatService.ChatMessageDataProposalResultEditedRequest
{
  @IsNotEmpty()
  @IsString()
  public _id!: string
  @IsNotEmpty()
  @IsNumber()
  public price!: number
  @IsNotEmpty()
  @IsString()
  public status!: keyof typeof RequestStatus
  @IsNotEmpty()
  @IsString()
  public title!: string
}

export class ChatMessageDataProposalResultEditedEdited
  implements TWebsocketChatService.ChatMessageDataProposalResultEditedEdited
{
  @IsOptional()
  @IsString({each: true})
  public linksToMediaFiles?: string[]
  @IsNotEmpty()
  @IsString()
  public result!: string
}

export class ChatMessageDataProposalResultEditedProposalContract
  implements TWebsocketChatService.ChatMessageDataProposalResultEditedProposal
{
  @IsNotEmpty()
  @IsString()
  public _id!: string
  @IsNotEmpty()
  @IsString()
  public status!: keyof typeof RequestProposalStatus
}

export class ChatMessageDataProposalResultEditedContract
  implements TWebsocketChatService.ChatMessageDataProposalResultEdited
{
  @IsOptional()
  @IsArray()
  public needApproveBy!: Array<string>
  @Type(() => ChatMessageDataProposalResultEditedEdited)
  public edited!: ChatMessageDataProposalResultEditedEdited
  @Type(() => ChatMessageDataProposalResultEditedRequestContract)
  public request!: ChatMessageDataProposalResultEditedRequestContract
  @Type(() => ChatMessageDataProposalResultEditedProposalContract)
  public proposal!: ChatMessageDataProposalResultEditedProposalContract
}
