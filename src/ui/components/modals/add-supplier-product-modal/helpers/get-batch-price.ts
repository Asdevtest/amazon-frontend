import { ICreateSupplierProduct } from '../add-supplier-product-modal.type'

export const getBatchPrice = (values: ICreateSupplierProduct) => {
  const { priceInYuan, amount, batchDeliveryCostInYuan } = values

  return Number(priceInYuan) * (Number(amount) || 0) + Number(batchDeliveryCostInYuan)
}
