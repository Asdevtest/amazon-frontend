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
]

export const disableSelectionCells = ['stockUSA', 'purchaseQuantity', 'barCode', 'stockUSA', 'tags']

export const disableDoubleClickOnCells = ['stockUSA', 'purchaseQuantity']

export const clickableCells = ['inTransfer', 'amountInBoxes', 'amountInOrders']
