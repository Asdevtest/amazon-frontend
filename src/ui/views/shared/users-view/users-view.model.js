import {makeAutoObservable} from 'mobx'

import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {UserModel} from '@models/user-model'

export class UsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onClickSubUsers() {
    this.history.push({
      pathname: `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/users/sub-users`,
    })
  }
}
