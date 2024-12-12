import { action, computed, observable } from 'mobx'

export const observerConfig = {
  supplierModel: observable,
  supplierCardModal: observable,
  selectedProductId: observable,
  selectedSupplierId: observable,
  selectedSupplierCardId: observable,

  productsMap: computed,

  onChangeSelectedSupplier: action.bound,
  onChangeSelectedSupplierCard: action.bound,
  onChangeSelectedProduct: action.bound,
  onBindSupplierCardToProduct: action.bound,
  onBindSupplierCardToIdea: action.bound,
}
