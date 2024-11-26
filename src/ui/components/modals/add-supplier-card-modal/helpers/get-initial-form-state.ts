import { Dimensions } from '@typings/enums/dimensions'
import { ISupplierCardFull } from '@typings/models/suppliers/supplier-card'

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
    return {
      ...body,
      ...supplierCard,
      supplierId: supplierCard?.supplier?._id || supplierId,
      categoryId: supplierCard?.category?._id,
    }
  }

  return body
}
