import { makeAutoObservable } from 'mobx'

import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

export class ModeratorDashboardViewModel {
  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
