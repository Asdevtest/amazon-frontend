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
]

export const filtersFields = [
  'shopId',
  'asin',
  'skuByClient',
  'amazonTitle',
  'strategyStatus',
  'amountInOrders',
  'inTransfer',
  'stockUSA',
  'boxAmounts',
  'sumStock',
  'amazon',
  'createdAt',
  'updatedAt',
  'profit',
  'fbafee',
  'status',
  'reservedSum',
  'sentToFbaSum',
  'fbaFbmStockSum',
  'ideasOnCheck',
  'stockCost',
  'purchaseQuantity',
  'ideasClosed',
  'ideasFinished',
  'tags',
  'redFlags',
  'transparency',
]

export const disableSelectionCells = ['stockUSA', 'purchaseQuantity', 'barCode', 'stockUSA']

export const disableDoubleClickOnCells = ['stockUSA', 'purchaseQuantity']

export const clickableCells = ['inTransfer', 'amountInBoxes', 'amountInOrders']
