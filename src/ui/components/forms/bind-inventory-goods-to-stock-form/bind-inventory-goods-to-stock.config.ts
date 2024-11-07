import { action, observable, override } from 'mobx'

export const bindInventoryGoodsToStockFormConfig = {
  initialAsin: observable,
  productId: observable,
  targetKeys: observable,
  onCloseModal: observable,

  onChange: action.bound,
  onSubmitBindStockGoods: action.bound,

  // dataWithKeys: override,
}

export const searchFields: string[] = ['asin', 'title', 'sku']
