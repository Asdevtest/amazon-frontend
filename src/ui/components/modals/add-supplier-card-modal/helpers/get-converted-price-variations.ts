import { IPriceVariation } from '@typings/models/suppliers/price-variation'

import { getPriceVariation } from './get-price-variation'

export const getConvertedPriceVariations = (priceVariations: IPriceVariation[]) =>
  priceVariations?.map(priceVariation => ({
    label: getPriceVariation(priceVariation),
    value: priceVariation,
    ...priceVariation,
  }))
