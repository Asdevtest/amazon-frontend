import { action, computed, observable } from 'mobx'

export const supplierConfig = {
  showSelectShopsModal: observable,
  supplierCardId: observable,
  supplier: computed,
  products: computed,
  onToggleSelectShopsModal: action.bound,
  onSelectSupplierCard: action.bound,
  onAddToInventory: action.bound,
}
