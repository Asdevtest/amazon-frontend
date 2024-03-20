import { ISpec } from '@typings/shared/spec'

import { ICreatedBy } from '../../shared/created-by'
import { IRequestMedia } from '../requests/request-media'

export interface IProposal {
  _id: string
  requestId: string
  type: string
  status: string
  timeoutAt: string
  execution_time: number
  attempts: number
  price: number
  comment: string
  linksToMediaFiles: Array<string>
  clientId: string
  supervisorId: string
  chatId: string
  lastModifiedById: string
  sub: ICreatedBy
  sourceFiles: Array<ISourceFile>
  media: Array<IRequestMedia>
  createdAt: string
  updatedAt: string
  title: string
  createdBy: ICreatedBy
  detailsCustom: IDetailsCustom
  request: IRequest
  sourceFile: string
  comments: string
  proposal: IProposal
  spec: ISpec
  productId: string
}

interface IDetailsCustom {
  result: string
  linksToMediaFiles: Array<string>
}

interface ISourceFile {
  sourceFile: string
  comments: string
}

interface IRequest {
  result: string
  linksToMediaFiles: Array<string>
}
