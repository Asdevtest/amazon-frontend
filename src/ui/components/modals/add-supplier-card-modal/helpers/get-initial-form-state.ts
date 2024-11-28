import { v4 as uuid } from 'uuid'

import { Dimensions } from '@typings/enums/dimensions'
import { ISupplierCardFull } from '@typings/models/suppliers/supplier-card'

import { getPriceVariation } from './get-price-variation'

export const getInitialFormState = ({
  supplierCard,
  supplierId,
  systemYuanToDollarRate,
}: {
  supplierCard?: ISupplierCardFull
  supplierId?: string
  systemYuanToDollarRate: number
}) => {
  const body = {
    supplierId,
    boxProperties: {
      dimensionType: Dimensions.EU,
    },
    unitDimensionType: Dimensions.EU,
    yuanToDollarRate: systemYuanToDollarRate,
  }

  if (supplierCard) {
    const priceVariations = supplierCard?.priceVariations?.map(priceVariation => ({
      label: getPriceVariation(priceVariation),
      value: uuid(),
      ...priceVariation,
    }))

    return {
      ...body,
      ...supplierCard,
      priceVariations,
      supplierId: supplierCard?.supplier?._id || supplierId,
      categoryId: supplierCard?.category?._id,
      heightUnit: supplierCard?.heightUnit || undefined,
      lengthUnit: supplierCard?.lengthUnit || undefined,
      widthUnit: supplierCard?.widthUnit || undefined,
      weighUnit: supplierCard?.weighUnit || undefined,
    }
  }

  return body
}
