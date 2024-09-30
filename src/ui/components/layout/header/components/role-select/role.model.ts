import { makeAutoObservable } from 'mobx'

import { UserModel } from '@models/user-model'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

import { roleMapper } from './role-mapper'

export class RoleModel {
  history?: HistoryType

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get roles() {
    const allowedRolesWithoutCandidate = this.userInfo?.allowedRoles?.filter((el: number) => el !== Roles.CANDIDATE)

    return allowedRolesWithoutCandidate?.map(roleMapper)
  }
  get disabledRoleSelect() {
    return this.roles?.length === 1
  }

  constructor(history: HistoryType) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onChangeUserInfo(role: Roles) {
    try {
      await UserModel.changeUserInfo({ role })
      await UserModel.forceUpdateToken()
      await UserModel.getUserInfo()

      this.history?.push(`/dashboard`)
    } catch (error) {
      console.error(error)
    }
  }
}
