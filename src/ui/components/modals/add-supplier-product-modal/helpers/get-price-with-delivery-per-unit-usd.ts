import { ICreateSupplierProduct } from '../add-supplier-product-modal.type'

import { getBatchPriceUsd } from './get-batch-price-usd'

export const getPriceWithDeliveryPerUnitUsd = (values: ICreateSupplierProduct) =>
  getBatchPriceUsd(values) / Number(values.amount)
