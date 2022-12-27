import {makeAutoObservable} from 'mobx'

import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class AppbarModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  get role() {
    return UserModel.userInfo?.role
  }

  get allowedRoles() {
    return UserModel.userInfo?.allowedRoles
  }

  get balance() {
    return UserModel.userInfo?.balance
  }

  get userName() {
    return UserModel.userInfo?.name
  }

  get userId() {
    return UserModel.userInfo?._id
  }

  get masterUser() {
    return UserModel.userInfo?.masterUser
  }

  get showHints() {
    return SettingsModel.showHints
  }

  get snackBarMessageLast() {
    return SettingsModel.snackBarMessageLast
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onExitFromRole() {
    UserModel.signOut()
  }

  onTriggerShowHints() {
    SettingsModel.onTriggerShowHints()
  }

  async changeUserInfo(data) {
    try {
      await UserModel.changeUserInfo(data)

      this.history.push(`/${UserRoleCodeMapForRoutes[data.role]}/dashboard`, {
        targetRoute: `/${UserRoleCodeMapForRoutes[data.role]}/dashboard`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  changeUiTheme(theme) {
    SettingsModel.setUiTheme(theme)
  }
}
