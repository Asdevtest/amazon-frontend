import { ICreateSupplierProductModal } from '../add-supplier-product-modal.type'

import { getBatchPriceUsd } from './get-batch-price-usd'

export const getPriceWithDeliveryPerUnitUsd = (values: ICreateSupplierProductModal) =>
  getBatchPriceUsd(values) / Number(values.amount)
