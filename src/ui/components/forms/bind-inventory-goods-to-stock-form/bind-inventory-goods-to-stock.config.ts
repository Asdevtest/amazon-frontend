import { action, computed, observable } from 'mobx'

export const bindInventoryGoodsToStockFormConfig = {
  initialAsin: observable,
  productId: observable,
  targetKeys: observable,
  onCloseModal: observable,

  onChange: action.bound,
  onSubmitBindStockGoods: action.bound,

  dataWithKeys: computed,
}

export const searchFields: string[] = ['asin', 'title', 'sku']
