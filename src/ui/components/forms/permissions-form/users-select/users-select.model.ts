import { makeObservable } from 'mobx'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

import { getDefaultUserOption, getUserOptions, usersSelectConfig } from './users-select.config'

export class UsersSelectModel extends InfiniteScrollModel<IFullUser> {
  defaultUser?: IFullUser

  get defaultUserOption() {
    return getDefaultUserOption(this.defaultUser)
  }
  get userOptions() {
    return getUserOptions(this.data, this.defaultUser)
  }

  constructor(defaultUser?: IFullUser) {
    super({ method: UserModel.getMySubUsers })

    this.defaultUser = defaultUser

    makeObservable(this, usersSelectConfig)
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }
}
