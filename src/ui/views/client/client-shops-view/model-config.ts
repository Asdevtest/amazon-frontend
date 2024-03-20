import { action, computed, observable } from 'mobx'

export const observerConfig = {
  selectedShop: observable,
  showAddOrEditShopModal: observable,
  showConfirmModal: observable,

  currentData: computed,

  updateShops: action.bound,
  onSubmitShopForm: action.bound,
  createShop: action.bound,
  removeShopById: action.bound,
  onSubmitRemoveShop: action.bound,
  onClickEditBtn: action.bound,
  onClickSeeShopReport: action.bound,
  onClickRemoveBtn: action.bound,
  onClickAddBtn: action.bound,
}
