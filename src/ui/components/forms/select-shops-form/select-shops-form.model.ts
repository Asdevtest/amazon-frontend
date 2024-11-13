import { makeObservable } from 'mobx'
import { UIEvent } from 'react'

import { ShopModel } from '@models/shop-model'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { generateItems, requestSelectConfig } from './select-shops-form.config'

export class SelectShopFormModel extends UseProductsPermissions {
  get items() {
    return generateItems(this.currentPermissionsData)
  }

  constructor() {
    super(ShopModel.getMyShops)

    makeObservable(this, requestSelectConfig)
  }

  onGetData = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }

  onScroll = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 90) {
      this.loadMoreDataHadler()
    }
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.onGetData()
    }
  }
}
