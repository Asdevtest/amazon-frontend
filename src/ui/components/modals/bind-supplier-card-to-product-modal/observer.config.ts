import { action, observable } from 'mobx'

export const observerConfig = {
  supplierModel: observable,
  supplierCardModal: observable,
  selectedProductId: observable,
  selectedSupplierId: observable,
  selectedSupplierCardId: observable,

  onChangeSelectedSupplier: action.bound,
  onChangeSelectedSupplierCard: action.bound,
  onChangeSelectedProduct: action.bound,
  onBindSupplierCardToProduct: action.bound,
}
