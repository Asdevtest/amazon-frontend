import { Dimensions } from '@typings/enums/dimensions'
import { ISupplierCardFull } from '@typings/models/suppliers/supplier-card'

import { getConvertedPriceVariations } from './get-converted-price-variations'

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
    const priceVariations = getConvertedPriceVariations(supplierCard?.priceVariations)

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
