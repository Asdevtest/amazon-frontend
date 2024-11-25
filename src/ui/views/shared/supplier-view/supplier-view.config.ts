import { action, computed, observable } from 'mobx'

export const supplierConfig = {
  showSelectShopsModal: observable,
  supplierCardId: observable,
  supplier: computed,
  products: computed,
  showFilter: computed,
  onToggleSelectShopsModal: action.bound,
  onSelectSupplierCard: action.bound,
  onAddToInventory: action.bound,
}
