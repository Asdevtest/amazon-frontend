import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

export class ProfileDropdownModel {
  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  signOut() {
    UserModel.signOut()
  }

  onExit() {
    toast.dismiss()
    toast.clearWaitingQueue()
    this.signOut()
  }
}
