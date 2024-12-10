import { makeObservable } from 'mobx'

import { ClientModel } from '@models/client-model'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { selectConfig } from './asin-select.config'

export class AsinSelectModel extends UseProductsPermissions {
  constructor() {
    super(ClientModel.getProductPermissionsData)
    makeObservable(this, selectConfig)
  }

  onGetData = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }
}
