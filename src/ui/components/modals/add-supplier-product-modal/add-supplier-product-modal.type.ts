import { Dimensions } from '@typings/enums/dimensions'
import { IBoxProperties } from '@typings/models/suppliers/supplier'

export interface ICreateSupplierProduct {
  supplierId: string
  cardName: string
  comment: string
  categoryId: string
  link: string
  price: number
  priceInUsd: number
  amount: number
  minlot: number
  priceInYuan: number
  images: string[]
  yuanToDollarRate: number
  isPrime: boolean
  boxProperties: IBoxPropertiesDimensionType
  batchDeliveryCostInDollar: number
  batchDeliveryCostInYuan: number
  batchTotalCostInDollar: number
  batchTotalCostInYuan: number
  minProductionTerm: number
  maxProductionTerm: number
  heightUnit: number
  widthUnit: number
  lengthUnit: number
  weighUnit: number
  unitDimensionType: Dimensions
  imageUnit: string[]
  multiplicity: boolean
  prices: IPrice[]
}

interface IBoxPropertiesDimensionType extends IBoxProperties {
  dimensionType: Dimensions
}

export interface IPrice {
  amount: number
  price: number
}

export enum SupplierCurrency {
  USD = '$',
  CNY = '¥',
}
