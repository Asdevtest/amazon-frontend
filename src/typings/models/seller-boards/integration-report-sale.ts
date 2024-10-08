import { IShopSell } from '../shop-sells/shop-sell'

export interface IIntegrationReportSale {
  _id: string
  productId: string
  shop: IShopSell
  shopId: string
  asin: string
  sku: string
  periodStart: string
  periodEnd: string
  week: number
  acos: number
  ppcImpressions: number
  clicks: number
  spend: number
  ppcOrders: number
  ppcUnits: number
  ppcSales: number
  orderSalesCost: number
  unitSalesCost: number
  organicSessions: number
  organicOrders: number
  organicUnits: number
  organicSales: number
  organicAvgOrderPrice: number
  organicAvgUnitPrice: number
  impressions: number
  sessions: number
  ctr: number
  orders: number
  units: number
  avgUnitsInPerOrder: number
  sales: number
  avgPriceOrder: number
  avgUnitPrice: number
  buyBox: number
  ppcSale: number
  organicSale: number
  conversion: number
  conversionPpc: number
  conversionOrganic: number
  dateUpdated: string
  createdAt: string
  updatedAt: string
}
