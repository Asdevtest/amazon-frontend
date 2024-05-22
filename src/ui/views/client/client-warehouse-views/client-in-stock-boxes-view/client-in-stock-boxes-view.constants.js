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
]

export const filtersFields = [
  'shopId',
  'humanFriendlyId',
  'id',
  'item',
  'asin',
  'skuByClient',
  'amazonTitle',
  'destination',
  'logicsTariff',
  'createdAt',
  'updatedAt',
  'amount',
  'prepId',
  'status',
  'storekeeper',
  'sub',
  'redFlags',
  'totalPrice',
]

export const fieldsForSearch = [
  'asin',
  'amazonTitle',
  'skuByClient',
  'id',
  'item',
  'productId',
  'humanFriendlyId',
  'prepId',
]

export const disableSelectionCells = ['prepId']

export const defaultStatuses = [
  BoxStatus.NEW,
  BoxStatus.IN_STOCK,
  BoxStatus.REQUESTED_SEND_TO_BATCH,
  BoxStatus.ACCEPTED_IN_PROCESSING,
  BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
  BoxStatus.NEED_TO_UPDATE_THE_TARIFF,
]
