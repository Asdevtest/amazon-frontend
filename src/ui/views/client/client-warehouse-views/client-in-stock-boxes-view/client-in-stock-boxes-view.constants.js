import { BoxStatus } from '@constants/statuses/box-status'

export const updateBoxWhiteList = [
  'amount',
  'weighGrossKg',
  'volumeWeightKg',
  'shippingLabel',
  'warehouse',
  'deliveryMethod',
  'lengthCmSupplier',
  'widthCmSupplier',
  'heightCmSupplier',
  'weighGrossKgSupplier',
  'lengthCmWarehouse',
  'widthCmWarehouse',
  'heightCmWarehouse',
  'weighGrossKgWarehouse',
  'isBarCodeAttachedByTheStorekeeper',
  'isShippingLabelAttachedByStorekeeper',
  'isBarCodeAlreadyAttachedByTheSupplier',
  'items',
  'clientComment',
  'images',
  'destinationId',
  'storekeeperId',
  'logicsTariffId',
  'fbaShipment',
  'referenceId',
  'trackNumberFile',
  'trackNumberText',
  'fbaNumber',
  'prepId',
  'variationTariffId',
  'transparencyFile',
  'clientComment',
]

export const updateManyBoxesWhiteList = [
  '_id',
  'logicsTariffId',
  'fbaShipment',
  'fbaNumber',
  'destinationId',
  'variationTariffId',
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
]

export const filtersFields = [
  'shopId',
  'xid',
  'id',
  'item',
  'asin',
  'skuByClient',
  'amazonTitle',
  'destination',
  'logicsTariff',
  'createdAt',
  'updatedAt',
  'totalAmount',
  'prepId',
  'status',
  'storekeeper',
  'sub',
  'redFlags',
  'totalPrice',
  'subUsers',
  'clientComment',
]

export const fieldsForSearch = ['asin', 'amazonTitle', 'skuByClient', 'orderXid', 'item', 'productId', 'xid', 'prepId'] //* check search

export const disableSelectionCells = ['prepId']
