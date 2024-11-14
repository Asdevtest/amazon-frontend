import { IBoxProperties } from '@typings/models/suppliers/supplier'

export interface ICreateSupplierProduct {
  supplierId: string
  cardName: string
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
}

export enum SupplierCurrency {
  USD = '$',
  CNY = '¥',
}
