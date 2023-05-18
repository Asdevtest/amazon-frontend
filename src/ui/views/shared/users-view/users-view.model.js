import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { UserModel } from '@models/user-model'

export class UsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickSubUsers() {
    this.history.push({
      pathname: `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/users/sub-users`,
    })
  }
}
