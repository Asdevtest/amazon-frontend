import { action, observable } from 'mobx'

export const observerConfig = {
  productId: observable,
  showOrderModal: observable,
  showSetBarcodeModal: observable,

  onRedirectToOrder: action.bound,
  onToggleOrderModal: action.bound,
}
