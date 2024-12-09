import { makeObservable } from 'mobx'

import { ClientModel } from '@models/client-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'

import { IProduct } from '@typings/models/products/product'

import { getOptions, selectConfig } from './asin-select.config'

export class AsinSelectModel extends InfiniteScrollModel<IProduct> {
  get asinOptions() {
    return getOptions(this.data)
  }

  constructor() {
    super({ method: ClientModel.getProductPermissionsData })
    makeObservable(this, selectConfig)
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }
}
