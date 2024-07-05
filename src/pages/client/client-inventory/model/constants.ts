export const TAGS = 'tags'

export const fieldsOfProductAllowedToUpdate = [
  'dirdecision',
  'researcherFine',
  'researcherFineComment',
  'supervisorFine',
  'supervisorFineComment',
  'barCode',
  'clientComment',
]

export const fieldsOfProductAllowedToCreate = [
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'fbafee',
  'reffee',
  'delivery',
  'icomment',
  'fba',
  'profit',
  'margin',
  'images',
  'width',
  'height',
  'length',
  'amazonTitle',
  'amazonDetail',
  'amazonDescription',
  'category',
  'weight',
  'minpurchase',
  'fbaamount',
  'strategyStatus',
  'currentSupplierId',
  'asin',
]

export const defaultHiddenColumns = [
  'stockUSA',
  'strategyStatus',
  'fbafee',
  'profit',
  'amazon',
  'createdAt',
  'updatedAt',
]

export const additionalFilterFields = [
  'inventoryAsin',
  'inventorySku',
  'asin',
  'skuByClient',
  'amazonTitle',
  'purchaseQuantity',
  'amountInBoxes',
  'toRefill',
  'currentSupplierMaxProductionTerm',
]

export const disableSelectionCells = ['stockUSA', 'purchaseQuantity', 'barCode', 'stockUSA', 'tags']

export const disableDoubleClickOnCells = ['stockUSA', 'purchaseQuantity']

export const clickableCells = ['inTransfer', 'amountInBoxes', 'amountInOrders']

export const numberCells = [
  'week',
  'acos',
  'ppcImpressions',
  'clicks',
  'spend',
  'ppcOrders',
  'ppcUnits',
  'ppcSales',
  'orderSalesCost',
  'unitSalesCost',
  'organicSessions',
  'organicOrders',
  'organicUnits',
  'organicSales',
  'organicAvgOrderPrice',
  'organicAvgUnitPrice',
  'impressions',
  'sessions',
  'ctr',
  'orders',
  'units',
  'avgUnitsInPerOrder',
  'sales',
  'avgPriceOrder',
  'avgUnitPrice',
  'buyBox',
  'ppcSale',
  'organicSale',
  'conversion',
  'conversionPpc',
  'conversionOrganic',
  'price',
  'fbaFee',
  'refFee',
  'available',
  'inbound',
  'reserved',
  'unitsExpected',

  'timeDataUpdate',
  'timeUpdated',

  'status',

  'organicCv',
  'fbaMinLvl',
  'cog',

  'unitProfit',
  'historicalDaysOfSupply',
  'estimatedStorageCost',
  'estimatedAgedInventorySurcharge',
  'age0to90Days',
  'age91to180Days',
  'age181to270Days',
  'age271to365Days',
  'age365plusDays',
  'storageVolume',
  'lowInventoryLevelFee',
]

export const textCells = ['categoryAbc', 'shipmentId', 'referenceId', 'shipTo']

export const dateCells = [
  'periodStart',
  'periodEnd',
  'createdAt',
  'updatedAt',
  'dateUpdated',
  'dateDataUpdate',
  'dateCreated',
  'scheduledCarrierDeliveryDate',
  'deliveryWindowStart',
  'deliveryWindowEnd',
]

export const complexCells = ['product', 'asin', 'sku', 'image']
