import { makeAutoObservable } from 'mobx'

import { UserModel } from '@models/user-model'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

import { roleMapper } from './helpers/roleMapper'

export class RoleSelectModel {
  history?: HistoryType

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

  constructor(history: HistoryType) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  /* async forceUpdateToken() {
    const userModel = await SettingsModel.loadValue('UserModel')
    const refreshToken = userModel.refreshToken

    await restApiService.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } }).then(({ data }) => {
      const accessToken = data?.accessToken

      SettingsModel.saveValue('UserModel', { ...userModel, accessToken })
      UserModel.setAccessToken(accessToken)

      ChatModel.disconnect()
      ChatModel.init(accessToken)
    })
  } */

  async onChangeUserInfo(role: Roles) {
    try {
      await UserModel.changeUserInfo(role)
      // await this.forceUpdateToken()
      await UserModel.getUserInfo()

      this.history?.push(`/dashboard`)
    } catch (error) {
      console.error(error)
    }
  }
}
