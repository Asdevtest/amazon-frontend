import { Dimensions } from '@typings/enums/dimensions'
import { IPriceVariation } from '@typings/models/suppliers/price-variation'
import { IBoxProperties } from '@typings/models/suppliers/supplier'

export interface ICreateSupplierCard {
  supplierId?: string | null
  cardName: string
  comment: string
  categoryId: string
  link: string
  priceInUsd: number
  amount: number
  minlot: number
  price: number
  priceInYuan: number
  images: string[]
  yuanToDollarRate: number
  isPrime: boolean
  boxProperties: IBoxProperties
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
  imageUnit: string[]
  multiplicity: boolean
  priceVariations: ICreateSupplierPrice[]
  material: string
  includedComponents: string
}

export interface ICreateSupplierProductModal extends ICreateSupplierCard {
  unitDimensionType: Dimensions
  boxProperties: IBoxPropertiesDimensionType
}

export interface IBoxPropertiesDimensionType extends IBoxProperties {
  dimensionType: Dimensions
}

export interface ICreateSupplierPrice extends IPriceVariation {
  label?: string
  value?: IPriceVariation
  price: number
  quantity: number
}

export enum SupplierCurrency {
  USD = '$',
  CNY = '¥',
}
