import { action, computed, observable } from 'mobx'

export const shopsViewModelConfig = {
  selectedShop: observable,
  shopModal: observable,

  disableUpdateButton: computed,

  onRemoveShop: action.bound,
  onEditShop: action.bound,
  onAddShop: action.bound,
  onUpdateShops: action.bound,
}
