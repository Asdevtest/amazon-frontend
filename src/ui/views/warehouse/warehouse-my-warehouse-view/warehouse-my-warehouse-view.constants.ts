export const updateBoxWhiteList = [
  'shippingLabel',
  'lengthCmWarehouse',
  'widthCmWarehouse',
  'heightCmWarehouse',
  'weighGrossKgWarehouse',
  'isShippingLabelAttachedByStorekeeper',
  'fbaShipment',
  'images',
  'destinationId',
  'items',
  'storekeeperComment',
  'logicsTariffId',
  'variationTariffId',
  'referenceId',
  'storekeeperTaskComment',
  'trackNumberFile',
  'trackNumberText',
  'upsTrackNumber',
  'fbaNumber',
  'prepId',
  'storage',
]

export const updateManyBoxesWhiteList = [
  '_id',
  'logicsTariffId',
  'fbaShipment',
  'fbaNumber',
  'destinationId',
  'variationTariffId',
  'isShippingLabelAttachedByStorekeeper',
  'items',
]

export const sharedFieldsWhiteList = [
  'barCode',
  'logicsTariffId',
  'shippingLabel',
  'fbaShipment',
  'fbaNumber',
  'destinationId',
  'transparencyFile',
  'variationTariffId',
  'isShippingLabelAttachedByStorekeeper',
  'isTransparencyFileAttachedByTheStorekeeper',
  'isTransparencyFileAlreadyAttachedByTheSupplier',
  'isBarCodeAlreadyAttachedByTheSupplier',
  'isBarCodeAttachedByTheStorekeeper',
]

export const additionalFilterFields = ['orderXid', 'item', 'skuByClient', 'amazonTitle', 'destination', 'logicsTariff']

export const fieldsForSearch = ['asin', 'amazonTitle', 'skuByClient', 'item', 'orderXid', 'xid', 'prepId']
