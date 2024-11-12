import { action, computed, observable } from 'mobx'

export const bindStockGoodsToInventoryFormConfig = {
  choosenGoods: observable,
  selectedProduct: observable,
  initialChoosenGoods: observable,
  onCloseModal: observable,

  onDeleteGoods: action.bound,
  onSelectProduct: action.bound,
  onResetData: action.bound,
  onSubmitBindStockGoods: action.bound,

  disableResetButton: computed,
  disableBindButton: computed,
}

export const searchFields: string[] = ['asin', 'amazonTitle']
