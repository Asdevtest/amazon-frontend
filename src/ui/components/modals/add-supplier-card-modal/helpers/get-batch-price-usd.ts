import { ICreateSupplierProductModal } from '../add-supplier-card-modal.type'

export const getBatchPriceUsd = (values: ICreateSupplierProductModal) => {
  const { priceInUsd, amount, batchDeliveryCostInDollar } = values

  return Number(priceInUsd) * (Number(amount) || 0) + Number(batchDeliveryCostInDollar)
}
