import { makeAutoObservable } from 'mobx'
import { NavigateFunction } from 'react-router-dom'

import { UserModel } from '@models/user-model'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'

import { roleMapper } from './helpers'

export class RoleSelectModel {
  navigate?: NavigateFunction

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser // TODO: типизация UserModel
  }
  get roles() {
    const allowedRolesWithoutCandidate = this.userInfo?.allowedRoles?.filter((el: number) => el !== Roles.CANDIDATE)

    return allowedRolesWithoutCandidate?.map(roleMapper)
  }
  get disabledRoleSelect() {
    return this.roles?.length === 1
  }

  constructor(navigate: NavigateFunction) {
    this.navigate = navigate

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onChangeUserInfo(role: Roles) {
    try {
      await UserModel.changeUserInfo({ role })
      await UserModel.forceUpdateToken()
      await UserModel.getUserInfo()

      this.navigate?.(`/dashboard`)
    } catch (error) {
      console.error(error)
    }
  }
}
