import {makeAutoObservable} from 'mobx'

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

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onExitFromRole() {
    UserModel.signOut()
  }

  async changeUserInfo(data) {
    try {
      await UserModel.changeUserInfo(data)
    } catch (error) {
      console.log(error)
    }
  }
}
