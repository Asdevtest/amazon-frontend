import { action, computed, observable } from 'mobx'

export const observerConfig = {
  _tabKey: observable,
  _inventoryProducts: observable,
  _showBindStockGoodsToInventoryModal: observable,
  _showWarningInfoModal: observable,

  tabKey: computed,
  inventoryProducts: computed,
  showBindStockGoodsToInventoryModal: computed,
  showWarningInfoModal: computed,

  changeTabHandler: action.bound,
  moveGoodsToInventoryHandler: action.bound,
  deleteReportHandler: action.bound,
  bindStockGoodsToInventoryHandler: action.bound,

  getProductsMy: action.bound,
  submitBindStockGoodsHandler: action.bound,
}
