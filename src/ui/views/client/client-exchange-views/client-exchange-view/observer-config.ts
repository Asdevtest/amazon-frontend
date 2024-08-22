import { action, computed, observable } from 'mobx'

export const observerConfig = {
  productsVacant: observable,
  storekeepers: observable,
  shopsData: observable,
  destinations: observable,
  ordersDataStateToSubmit: observable,
  showConfirmModal: observable,
  showSelectShopsModal: observable,
  showOrderModal: observable,
  selectedProduct: observable,
  selectedShopId: observable,

  destinationsFavourites: computed,
  platformSettings: computed,

  onDoubleClickBarcode: action.bound,
  updateUserInfo: action.bound,
  setDestinationsFavouritesItem: action.bound,
  getProductById: action.bound,
  onClickLaunchPrivateLabelBtn: action.bound,
  getShops: action.bound,
  createOrder: action.bound,
  onLaunchPrivateLabel: action.bound,
  openCreateOrder: action.bound,
  onClickBuyProductBtn: action.bound,
  onSaveProductData: action.bound,
  onClickCancelBtn: action.bound,
  onClickOrderNowBtn: action.bound,
}
