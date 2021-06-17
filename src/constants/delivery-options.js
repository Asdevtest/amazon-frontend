import {getLocalizedTexts} from '@utils/get-localized-texts'

import {texts} from './texts'

export const DeliveryType = {
  ROAD: 'ROAD',
  SEA: 'SEA',
  AIR: 'AIR',
  TRAIN: 'TRAIN',
  MULTIPLE: 'MULTIPLE',
}

export const DeliveryTypeByCode = {
  0: DeliveryType.ROAD,
  1: DeliveryType.SEA,
  2: DeliveryType.AIR,
  3: DeliveryType.TRAIN,
  4: DeliveryType.MULTIPLE,
}

const textConfig = getLocalizedTexts(texts, 'en').deliveryType

export const DELIVERY_OPTIONS = [
  {
    key: DeliveryType.ROAD,
    label: textConfig.road,
  },
  {
    key: DeliveryType.SEA,
    label: textConfig.sea,
  },
  {
    key: DeliveryType.AIR,
    label: textConfig.air,
  },
  {
    key: DeliveryType.TRAIN,
    label: textConfig.train,
  },
  {
    key: DeliveryType.MULTIPLE,
    label: textConfig.multiple,
  },
]

export const getDeliveryOptionByCode = deliveryCode =>
  DELIVERY_OPTIONS.find(deliveryOption => deliveryOption.key === DeliveryTypeByCode[deliveryCode])
