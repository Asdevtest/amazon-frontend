import { action, computed, observable } from 'mobx'

export const supplierConfig = {
  showSelectShopsModal: observable,
  supplierCardIds: observable,
  supplier: computed,
  products: computed,
  showFilter: computed,
  productsAll: computed,
  productsBig: computed,
  onToggleSelectShopsModal: action.bound,
  onChangeSupplierCards: action.bound,
  onSelectSupplierCard: action.bound,
  onAddToInventory: action.bound,
}

export const filterFields = ['priceMin', 'priceMax', 'categories', 'moqMin', 'moqMax', 'cardName']
