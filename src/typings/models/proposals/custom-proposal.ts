import { IDetail } from '../requests/detail'
import { IRequest } from '../requests/request'

import { IProposal } from './proposal'

export interface ICustomProposal {
  proposal: IProposal
  details: IDetail
  request: IRequest
}
