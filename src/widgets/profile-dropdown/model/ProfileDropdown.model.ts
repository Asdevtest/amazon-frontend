import { makeAutoObservable } from 'mobx'

import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

export class ProfileDropdownModel {
  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser // TODO: типизация UserModel
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  signOut() {
    UserModel.signOut()
  }
}
