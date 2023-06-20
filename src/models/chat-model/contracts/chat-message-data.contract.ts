import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'

import { TWebsocketChatService } from '@services/websocket-chat-service'

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
  @IsNotEmpty()
  @IsString()
  public title?: string
}

export class ChatMessageDataCreatedNewProposalRequestDescriptionDetailsContract
  implements TWebsocketChatService.ChatMessageDataCreatedNewProposalRequestDescriptionDetails
{
  @IsNotEmpty()
  @IsString()
  public conditions!: string

  @IsOptional()
  public linksToMediaFiles?: string[] | null
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
  @IsString({ each: true })
  public linksToMediaFiles!: string[]
  @IsOptional()
  @IsNumber()
  public timeLimitInMinutes?: number
}

export class ChatMessageDataAddUsersToGroupChatContract
  implements TWebsocketChatService.ChatMessageDataAddUsersToGroupChat
{
  @IsNotEmpty()
  @IsString()
  public createdBy!: string
  @IsNotEmpty()
  @IsString()
  public title!: string
  @IsNotEmpty()
  public users!: { _id: string; name: string }[]
}

export class ChatMessageRemoveUsersFromGroupChatContract
  implements TWebsocketChatService.ChatMessageRemoveUsersFromGroupChat
{
  @IsNotEmpty()
  @IsString()
  public createdBy!: string
  @IsNotEmpty()
  @IsString()
  public title!: string
  @IsNotEmpty()
  public users!: { _id: string; name: string }[]
}

export class ChatMessageRemovePatchInfoGroupChatContract
  implements TWebsocketChatService.ChatMessagePatchInfoGroupChat
{
  @IsNotEmpty()
  @IsString()
  public createdBy!: string
  @IsNotEmpty()
  @IsString()
  public title!: string

  @IsNotEmpty()
  public updatedData!: { image: string; title: string }

  @IsNotEmpty()
  public prevData!: { image: string; title: string }
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

export class ChatMessageDataRequestCreateNewBloggerProposalContract
  implements TWebsocketChatService.ChatMessageDataRequestCreateNewBloggerProposal
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

  @IsOptional()
  public cashBackInPercent!: number

  @IsNotEmpty()
  public details!: { conditions: string; linksToMediaFiles: [string] }

  @IsNotEmpty()
  public media!: { fileLink: string; commentByClient: string }[]

  // @IsNotEmpty()
  // public media!: string[]

  @IsNotEmpty()
  public createdBy!: { _id: string }

  @IsNumber()
  public priceAmazon!: number
  @IsNotEmpty()
  @IsString()
  public timeoutAt!: string
}

export class ChatMessageDataRequestCreateNewDesignerProposalContract
  implements TWebsocketChatService.ChatMessageDataRequestCreateNewDesignerProposal
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

  @IsOptional()
  public cashBackInPercent!: number

  @IsNotEmpty()
  public details!: { conditions: string; linksToMediaFiles: [string] }

  @IsNotEmpty()
  public media!: { fileLink: string; commentByClient: string }[]

  // @IsNotEmpty()
  // public media!: string[]

  @IsNotEmpty()
  public createdBy!: { _id: string }

  @IsNumber()
  public priceAmazon!: number
  @IsNotEmpty()
  @IsString()
  public timeoutAt!: string
}

export class ChatMessageDataRequestDesignerProposalContract
  implements TWebsocketChatService.ChatMessageDataRequestDesignerProposal
{
  @IsNotEmpty()
  @IsString()
  public asin!: string
}

export class ChatMessageDataProposalCreateNewBloggerProposalContract
  implements TWebsocketChatService.ChatMessageDataProposalCreateNewBloggerProposal
{
  @IsString()
  _id!: string
  @IsString()
  public comment!: string
  @IsNotEmpty()
  public linksToMediaFiles!: [string]

  @IsNotEmpty()
  public execution_time!: number

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

export class ChatMessageDataProposalCreateNewDesignerProposalContract
  implements TWebsocketChatService.ChatMessageDataProposalCreateNewDesignerProposal
{
  @IsString()
  _id!: string
  @IsString()
  public comment!: string
  @IsNotEmpty()
  public linksToMediaFiles!: [string]

  @IsNotEmpty()
  public execution_time!: number

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

export class ChatMessageDataProposalBloggerProposalResultEdited
  implements TWebsocketChatService.ChatMessageDataProposalBloggerProposalResultEditedProposal
{
  @IsNotEmpty()
  public _id!: string

  @IsNotEmpty()
  public details!: {
    amazonOrderId: string | null
    linksToMediaFiles: [string]
    publicationLinks: [string]
    result: string
  }
}

export class ChatMessageDataProposalDesignerProposalResultEdited
  implements TWebsocketChatService.ChatMessageDataProposalDesignerProposalResultEditedProposal
{
  @IsNotEmpty()
  public _id!: string

  @IsNotEmpty()
  public comment!: string

  @IsNotEmpty()
  public execution_time!: number

  @IsNotEmpty()
  public title!: string

  @IsNotEmpty()
  public details!: { result: string }

  @IsNotEmpty()
  public media!: {
    commentByClient: string | null
    commentByPerformer: string | null
    fileLink: string
    _id: string
  }[]
}

export class ChatMessageDataProposalResultEditedEdited
  implements TWebsocketChatService.ChatMessageDataProposalResultEditedEdited
{
  @IsOptional()
  @IsString({ each: true })
  public linksToMediaFiles?: { fileLink: string; commentByPerformer: string }[] | string[]
  @IsNotEmpty()
  @IsString()
  public result!: string
  @IsOptional()
  public media?: { commentByPerformer: string; fileLink: string; index: number; _id: string }[]
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

export class ChatMessageDataCreateNewBloggerProposalContract
  implements TWebsocketChatService.ChatMessageDataCreateNewBloggerProposal
{
  @Type(() => ChatMessageDataRequestCreateNewBloggerProposalContract)
  public request!: ChatMessageDataRequestCreateNewBloggerProposalContract
  @Type(() => ChatMessageDataProposalCreateNewBloggerProposalContract)
  public proposal!: ChatMessageDataProposalCreateNewBloggerProposalContract
}

export class ChatMessageDataCreateNewDesignerProposalContract
  implements TWebsocketChatService.ChatMessageDataCreateNewDesignerProposal
{
  @Type(() => ChatMessageDataRequestCreateNewDesignerProposalContract)
  public request!: ChatMessageDataRequestCreateNewDesignerProposalContract
  @Type(() => ChatMessageDataProposalCreateNewDesignerProposalContract)
  public proposal!: ChatMessageDataProposalCreateNewDesignerProposalContract
}

export class ChatMessageDataBloggerProposalResultEditedContract
  implements TWebsocketChatService.ChatMessageDataBloggerProposalResultEdited
{
  @Type(() => ChatMessageDataProposalBloggerProposalResultEdited)
  public proposal!: ChatMessageDataProposalBloggerProposalResultEdited
}

export class ChatMessageDataDesignerProposalResultEditedContract
  implements TWebsocketChatService.ChatMessageDataDesignerProposalResultEdited
{
  @Type(() => ChatMessageDataProposalDesignerProposalResultEdited)
  public proposal!: ChatMessageDataProposalDesignerProposalResultEdited

  @Type(() => ChatMessageDataRequestDesignerProposalContract)
  public request!: ChatMessageDataRequestDesignerProposalContract
}
