import { action, observable } from 'mobx'

export const supplierConfig = {
  showSelectShopsModal: observable,
  onToggleSelectShopsModal: action.bound,
  onAddToInventory: action.bound,
}
