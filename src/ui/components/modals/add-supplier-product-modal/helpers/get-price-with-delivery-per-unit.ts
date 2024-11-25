import { ICreateSupplierProductModal } from '../add-supplier-product-modal.type'

import { getBatchPrice } from './get-batch-price'

export const getPriceWithDeliveryPerUnit = (values: ICreateSupplierProductModal) =>
  getBatchPrice(values) / Number(values.amount)
