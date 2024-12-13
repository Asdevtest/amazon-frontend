import { makeObservable } from 'mobx'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { ShopModel } from '@models/shop-model'

import { IShop } from '@typings/models/shops/shop'

import { generateItems, shopsSelectConfig } from './shop-select.config'

export class ShopSelectModel extends InfiniteScrollModel<IShop> {
  selectedShopId: string | null = null

  get items() {
    return generateItems(this.data)
  }

  constructor() {
    super({ method: ShopModel.getMyShops })

    makeObservable(this, shopsSelectConfig)
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }

  onSelectShop = (value: string) => {
    this.selectedShopId = value
  }
}
