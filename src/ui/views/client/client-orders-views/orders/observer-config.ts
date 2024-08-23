import { action, computed, observable } from 'mobx'

export const observerConfig = {
  orders: observable,

  order: observable,
  onAmazon: observable,

  showOrderModal: observable,
  showProductModal: observable,
  showSetBarcodeModal: observable,
  showConfirmModal: observable,
  productBatches: observable,
  showCheckPendingOrderFormModal: observable,
  showMyOrderModal: observable,
  showProductDataModal: observable,

  myOrderModalSwitcherCondition: observable,
  productAndBatchModalSwitcherCondition: observable,

  existingProducts: observable,
  shopsData: observable,

  selectedWarehouseOrderProduct: observable,
  selectedProduct: observable,
  reorderOrdersData: observable,
  uploadedFiles: observable,

  storekeepers: observable,
  destinations: observable,

  currentBatch: observable,

  activeProductGuid: observable,

  destinationsFavourites: computed,
  isPendingOrdering: computed,
  userInfo: computed,
  platformSettings: computed,

  onChangeIsFormed: action.bound,
  setDestinationsFavouritesItem: action.bound,
  onClickManyReorder: action.bound,
  onConfirmCancelManyReorder: action.bound,
  onSubmitCancelOrder: action.bound,
  onClickCancelManyReorder: action.bound,
  getBatches: action.bound,
  onClickReorder: action.bound,
  onClickContinueBtn: action.bound,
  onClickPandingOrder: action.bound,
  onDoubleClickBarcode: action.bound,
  onClickSaveBarcode: action.bound,
  createOrder: action.bound,
  updateUserInfo: action.bound,
  onSubmitOrderProductModal: action.bound,
  onConfirmSubmitOrderProductModal: action.bound,
  onClickOpenNewTab: action.bound,
  getOrderById: action.bound,
  onClickMyOrderModal: action.bound,
  getCurrBatch: action.bound,
  onClickChangeProductAndBatchModalCondition: action.bound,
  onClickWarehouseOrderButton: action.bound,
  onClickChangeMyOrderModalCondition: action.bound,
  getDestinations: action.bound,
  getStorekeepers: action.bound,
  onClickCancelOrder: action.bound,
  onSubmitSaveOrder: action.bound,
  patchActualShippingCostBatch: action.bound,
  onOpenProductDataModal: action.bound,
}
