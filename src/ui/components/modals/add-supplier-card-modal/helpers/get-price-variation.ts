import { IPriceVariation } from '@typings/models/suppliers/price-variation'

import { SupplierCurrency } from '../add-supplier-card-modal.type'

export const getPriceVariation = (priceVariation: IPriceVariation) =>
  `${priceVariation.quantity} / ${priceVariation.price}${SupplierCurrency.CNY}`
