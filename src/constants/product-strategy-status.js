import {objectFlip} from '@utils/object'

export const ProductStrategyStatus = {
  // NONE: 'NONE',
  DROPSHIPPING: 'DROPSHIPPING',
  PRIVATE_LABEL: 'PRIVATE_LABEL',
  ONLINE_ARBITRAGE_CHINA: 'ONLINE_ARBITRAGE_CHINA',
  WHOLE_SALE_USA: 'WHOLE_SALE_USA',
}

export const mapProductStrategyStatusEnum = {
  // 0: ProductStrategyStatus.NONE,
  10: ProductStrategyStatus.DROPSHIPPING,
  20: ProductStrategyStatus.PRIVATE_LABEL,
  30: ProductStrategyStatus.ONLINE_ARBITRAGE_CHINA,
  40: ProductStrategyStatus.WHOLE_SALE_USA,
}

export const humanFriendlyStategyStatus = value => {
  switch (value) {
    case ProductStrategyStatus.DROPSHIPPING:
      return 'Dropshipping'
    case ProductStrategyStatus.ONLINE_ARBITRAGE_CHINA:
      return 'Online arbitrage China'
    case ProductStrategyStatus.PRIVATE_LABEL:
      return 'Private Label'
    case ProductStrategyStatus.WHOLE_SALE_USA:
      return 'Whole sale USA'
  }
}

export const mapProductStrategyStatusEnumToKey = objectFlip(mapProductStrategyStatusEnum, parseInt)
