import { ICategory } from '@typings/shared/category'
import { ICreatedBy } from '@typings/shared/created-by'

import { IPriceVariation } from './price-variation'
import { IBoxProperties } from './supplier'
import { ISupplierV2 } from './supplier-v2'

export interface ISupplierCardFull {
  _id: string
  xid: number
  supplier: ISupplierV2
  cardName: string
  category: ICategory
  link: string
  priceInUsd: number
  amount: number
  minlot: number
  images: string[]
  comment: string
  yuanToDollarRate: number
  multiplicity: boolean
  heightUnit: number
  widthUnit: number
  lengthUnit: number
  weighUnit: number
  imageUnit: string[]
  isPrime: boolean
  priceInYuan: number
  batchDeliveryCostInDollar: number
  batchDeliveryCostInYuan: number
  batchTotalCostInDollar: number
  batchTotalCostInYuan: number
  boxProperties: IBoxProperties
  minProductionTerm: number
  maxProductionTerm: number
  createdBy: ICreatedBy
  costUnitWithDeliveryToChina: number
  priceVariations: IPriceVariation[]
  createdAt: string
  updatedAt: string
}
