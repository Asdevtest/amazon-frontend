import { ICreateSupplierProduct } from '../add-supplier-product-modal.type'

import { getBatchPrice } from './get-batch-price'

export const getPriceWithDeliveryPerUnit = (values: ICreateSupplierProduct) =>
  getBatchPrice(values) / Number(values.amount)
