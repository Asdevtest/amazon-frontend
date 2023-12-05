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

export const filtersFields = [
  'shopIds',
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
]

export const defaultHiddenFields = ['strategyStatus', 'createdAt', 'updatedAt']

export const disableSelectionCells = ['stockUSA', 'purchaseQuantity', 'barCode', 'stockUSA']

export const disableDoubleClickOnCells = ['stockUSA', 'purchaseQuantity']

export const clickableCells = ['inTransfer', 'amountInBoxes', 'amountInOrders']
