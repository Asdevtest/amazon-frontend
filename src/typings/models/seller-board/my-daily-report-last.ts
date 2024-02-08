import { IShop } from '@typings/shop'

export interface IDailyReport {
  count?: number

  rows?: Array<IMyDailyReportItem>
}

export interface IMyDailyReportItem {
  _id?: string
  shop?: IShop
  date?: string
  marketplace?: string
  asin?: string
  sku?: string
  name?: string
  salesorganic?: number
  salesppc?: number
  unitsorganic?: number
  unitsppc?: number
  refunds?: number
  promovalue?: number
  sponsoredproducts?: number
  sponsoreddisplay?: number
  sponsoredRands?: number
  sponsoredbrandsvideo?: number
  giftwrap?: number
  shipping?: number
  refundcost?: number
  valueOfReturnedItems?: number
  productcostUnsellableRefunds?: number
  commission?: number
  compensatedClawback?: number
  fbadisposalfee?: number
  fbaperunitfulfillmentfee?: number
  fbastoragefee?: number
  freeReplacementRefundItems?: number
  subscription?: number
  warehouseDamage?: number
  warehouseLost?: number
  estimatedpayout?: number
  productcostSales?: number
  productcostNonAmazon?: number
  productcostMultichannelcosts?: number
  productcostMissingfrominbound?: number
  productcostCostofmissingreturns?: number
  vat?: number
  grossprofit?: number
  netprofit?: number
  margin?: number
  realAcos?: number
  adjustmentFbaperunitfulfillmentfee?: number
  amazonfees?: number
  costOfGoods?: number
  createdAt?: string
  updatedAt?: string
}
