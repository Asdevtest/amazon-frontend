import { makeAutoObservable } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class UsersViewModel {
  history?: HistoryType

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor(history: HistoryType) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickSubUsers() {
    this.history?.push({
      pathname: `/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/users/sub-users`,
    })
  }
}
