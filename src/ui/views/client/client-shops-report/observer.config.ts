import { action, observable } from 'mobx'

export const observerConfig = {
  tabKey: observable,
  inventoryProducts: observable,
  showBindStockGoodsToInventoryModal: observable,
  showWarningInfoModal: observable,
  showConfirmModal: observable,
  showSelectShopsModal: observable,
  shopsData: observable,

  changeTabHandler: action.bound,
  moveGoodsToInventoryHandler: action.bound,
  deleteReportHandler: action.bound,
  bindStockGoodsToInventoryHandler: action.bound,
  submitDeleteReportHandler: action.bound,
  getTableData: action.bound,
  getProductsMy: action.bound,
  submitBindStockGoodsHandler: action.bound,
  initUserSettings: action.bound,
  getShopsData: action.bound,
  bindReportInventoryHandler: action.bound,
}
