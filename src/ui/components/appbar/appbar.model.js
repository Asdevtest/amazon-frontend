import {makeAutoObservable} from 'mobx'

import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class AppbarModel {
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

  constructor() {
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
    } catch (error) {
      console.log(error)
    }
  }

  changeUiTheme(theme) {
    SettingsModel.setUiTheme(theme)
  }
}
