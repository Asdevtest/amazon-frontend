import { ICreateSupplierProductModal } from '../add-supplier-card-modal.type'

import { getBatchPrice } from './get-batch-price'

export const getPriceWithDeliveryPerUnit = (values: ICreateSupplierProductModal) =>
  getBatchPrice(values) / Number(values.amount)
