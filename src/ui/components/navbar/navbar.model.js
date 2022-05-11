import {makeAutoObservable} from 'mobx'

import {UserModel} from '@models/user-model'

export class NavbarModel {
  get userInfo() {
    return UserModel.userInfo
  }
  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
  }
}
