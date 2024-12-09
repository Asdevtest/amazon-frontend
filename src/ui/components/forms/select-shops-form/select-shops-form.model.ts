import { makeObservable } from 'mobx'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { ShopModel } from '@models/shop-model'

import { IShop } from '@typings/models/shops/shop'

import { generateItems, shopsSelectConfig } from './select-shops-form.config'

export class SelectShopFormModel extends InfiniteScrollModel<IShop> {
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
}
