import { ICreateSupplierProduct } from '../add-supplier-product-modal.type'

export const getBatchPriceUsd = (values: ICreateSupplierProduct) => {
  const { priceInUsd, amount, batchDeliveryCostInDollar } = values

  return Number(priceInUsd) * (Number(amount) || 0) + Number(batchDeliveryCostInDollar)
}
