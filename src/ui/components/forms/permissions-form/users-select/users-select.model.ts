import { makeObservable } from 'mobx'
import { UIEvent } from 'react'

import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { getDefaultUserOption, getUserOptions, requestSelectConfig } from './users-select.config'

export class UsersSelectModel extends UseProductsPermissions {
  defaultUser?: IFullUser

  get defaultUserOption() {
    return getDefaultUserOption(this.defaultUser)
  }
  get userOptions() {
    return getUserOptions(this.currentPermissionsData, this.defaultUser)
  }

  constructor(defaultUser?: IFullUser) {
    super(UserModel.getMySubUsers)

    this.defaultUser = defaultUser

    makeObservable(this, requestSelectConfig)
  }

  onGetUsers = () => {
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
      this.onGetUsers()
    }
  }
}
