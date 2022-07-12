import {objectFlip} from '@utils/object'

export const ProductStrategyStatus = {
  // NONE: 'NONE',
  DROPSHIPPING: 'DROPSHIPPING',
  PRIVATE_LABEL: 'PRIVATE_LABEL',
  ONLINE_ARBITRAGE_CHINA: 'ONLINE_ARBITRAGE_CHINA',
  WHOLESALE_USA: 'WHOLESALE_USA',
}

export const mapProductStrategyStatusEnum = {
  // 0: ProductStrategyStatus.NONE,
  10: ProductStrategyStatus.DROPSHIPPING,
  20: ProductStrategyStatus.PRIVATE_LABEL,
  30: ProductStrategyStatus.ONLINE_ARBITRAGE_CHINA,
  40: ProductStrategyStatus.WHOLESALE_USA,
}

export const mapProductStrategyStatusEnumToKey = objectFlip(mapProductStrategyStatusEnum, parseInt)
