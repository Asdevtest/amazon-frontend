import { makeObservable } from 'mobx'

import { UserModel } from '@models/user-model'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { performersSelectConfig } from './performer-select.config'

export class PerformerSelectModel extends UseProductsPermissions {
  constructor() {
    super(UserModel.getMySubUsers)

    makeObservable(this, performersSelectConfig)
  }

  onGetUsers = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }
}
