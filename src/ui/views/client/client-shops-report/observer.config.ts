import { action, computed, observable } from 'mobx'

export const observerConfig = {
  _tabKey: observable,
  _inventoryProducts: observable,
  _showBindStockGoodsToInventoryModal: observable,
  _showWarningInfoModal: observable,
  _showConfirmModal: observable,
  showSelectShopsModal: observable,
  shopsData: observable,

  tabKey: computed,
  inventoryProducts: computed,
  showBindStockGoodsToInventoryModal: computed,
  showWarningInfoModal: computed,
  showConfirmModal: computed,

  changeTabHandler: action.bound,
  moveGoodsToInventoryHandler: action.bound,
  deleteReportHandler: action.bound,
  bindStockGoodsToInventoryHandler: action.bound,
  submitDeleteReportHandler: action.bound,

  getProductsMy: action.bound,
  submitBindStockGoodsHandler: action.bound,
  initUserSettings: action.bound,
  getShopsData: action.bound,
  bindReportInventoryHandler: action.bound,
}
