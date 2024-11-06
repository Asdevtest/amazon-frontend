import { action, observable } from 'mobx'

export const bindStockGoodsToInventoryFormConfig = {
  choosenGoods: observable,
  selectedProduct: observable,
  initialChoosenGoods: observable,
  onCloseModal: observable,

  onDeleteGoods: action.bound,
  onSelectProduct: action.bound,
  onResetData: action.bound,
  onSubmitBindStockGoods: action.bound,
}

export const searchFields: string[] = ['asin', 'amazonTitle']
