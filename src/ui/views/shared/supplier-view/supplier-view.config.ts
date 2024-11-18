import { action, computed, observable } from 'mobx'

export const supplierConfig = {
  showSelectShopsModal: observable,
  supplierCardId: observable,
  supplier: computed,
  products: computed,
  loading: computed,
  onScroll: action.bound,
  onToggleSelectShopsModal: action.bound,
  onSelectSupplierCard: action.bound,
  onAddToInventory: action.bound,
  onSubmitFilters: action.bound,
}
