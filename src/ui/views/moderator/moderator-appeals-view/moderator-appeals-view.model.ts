import { makeAutoObservable } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class ModeratorAppealsViewModel {
  history?: HistoryType

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor(history: HistoryType) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickViewMore() {
    this.history?.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/appeals/appeal`)
  }
}
