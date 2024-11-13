import { makeObservable } from 'mobx'
import { UIEvent } from 'react'

import { ClientModel } from '@models/client-model'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { wholesaleConfig } from './wholesale.config'

export class WholesaleViewModel extends UseProductsPermissions {
  get suppliers() {
    return this.currentPermissionsData as unknown as ISupplierExchange[]
  }

  constructor() {
    const requestOptions = {
      sortField: 'updatedAt',
      sortType: 'DESC',
    }
    super(ClientModel.getSuppliersExchange, requestOptions, ['xid'])
    this.permissionsData = []
    this.isCanLoadMore = true
    this.getPermissionsData()
    makeObservable(this, wholesaleConfig)
  }

  onScroll = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 200) {
      this.loadMoreDataHadler()
    }
  }
}
