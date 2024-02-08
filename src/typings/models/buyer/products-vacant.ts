import { ITag } from '../shared/tag'

export interface IBuyerProductsVac {
  _id?: string
  asin?: string
  skuByClient?: string
  strategyStatus?: number
  hasChildren?: boolean
  checkednotes?: string
  bsr?: number
  amazon?: number
  reffee?: number
  fbafee?: number
  fbaamount?: number
  status?: number
  images?: Array<string>
  amazonTitle?: string
  profit?: number
  material?: string
  productUsage?: string
  chinaTitle?: string
  ideasOnCheck?: number
  ideasFinished?: number
  ideasClosed?: number
  tags?: Array<ITag>
  redFlags?: Array<IStatusRedFlags>
  createdAt?: string
  updatedAt?: string
}

interface IStatusRedFlags {
  _id?: string
  productCount?: number
  value?: number
  title?: string
  iconImage?: string
}
