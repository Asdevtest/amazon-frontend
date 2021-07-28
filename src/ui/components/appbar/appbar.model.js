import {makeAutoObservable} from 'mobx'

import {UserModel} from '@models/user-model'

export class AppbarModel {
  requestStatus = undefined
  error = undefined
  userRole = undefined

  balance = UserModel.userInfo.balance

  constructor({userRole}) {
    this.userRole = userRole
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onExitFromRole() {
    UserModel.signOut()
  }
}
