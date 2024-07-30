import { action, computed, observable } from 'mobx'

export const shopsViewModelConfig = {
  selectedShop: observable,
  showAddOrEditShopModal: observable,

  disableUpdateButton: computed,

  onRemoveShop: action.bound,
  onEditShop: action.bound,
  onAddShop: action.bound,
  onCreateShop: action.bound,
  onSeeShopReport: action.bound,
  onUpdateShops: action.bound,
}
