import { IProposal } from '../proposals/proposal'

import { IDetail } from './detail'
import { IRequest } from './request'

export interface ICustomRequest {
  request: IRequest
  details: IDetail
  proposal: IProposal
}
