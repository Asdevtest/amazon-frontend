import { ICreateSupplierProductModal } from '../add-supplier-card-modal.type'

export const getBatchPrice = (values: ICreateSupplierProductModal) => {
  const { priceInYuan, amount, batchDeliveryCostInYuan } = values

  return Number(priceInYuan) * (Number(amount) || 0) + Number(batchDeliveryCostInYuan)
}