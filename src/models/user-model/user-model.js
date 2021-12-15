import {makeAutoObservable, runInAction} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {UserInfoContract} from './user-model.contracts'

const persistProperties = ['accessToken', 'userInfo']

const stateModelName = 'UserModel'

class UserModelStatic {
  accessToken = undefined
  userInfo = undefined
  isHydrated = false

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistable(this, {name: stateModelName, properties: persistProperties}).then(persistStore => {
      runInAction(() => {
        this.isHydrated = persistStore.isHydrated
        if (this.accessToken) {
          restApiService.setAccessToken(this.accessToken)
          this.getUserInfo()
        }
      })
    })
    restApiService.setAccessToken(this.accessToken)
  }

  isAuthenticated() {
    return !!this.accessToken
  }

  signOut() {
    this.accessToken = undefined
    this.userInfo = undefined
    restApiService.removeAccessToken()
  }

  async signIn(email, password) {
    const response = await restApiService.userApi.apiV1UsersSignInPost({
      body: {
        email,
        password,
      },
    })
    const accessToken = response.token
    runInAction(() => {
      this.accessToken = accessToken
    })
    restApiService.setAccessToken(accessToken)
  }

  async signUp({name, email, password}) {
    const response = await restApiService.userApi.apiV1UsersPost({
      body: {
        name,
        email,
        password,
      },
    })
    this.userInfo = ApiClient.convertToType(response, UserInfoContract)
  }

  async getUserInfo() {
    const response = await restApiService.userApi.apiV1UsersInfoGet()
    runInAction(() => {
      this.userInfo = response
    })
    return response
  }

  async changeUserInfo(data) {
    const response = await restApiService.userApi.apiV1UsersMePatch(data)

    return response
  }

  async linkSubUser(data) {
    const response = await restApiService.userApi.apiV1UsersLinkSubUserPatch(data)

    return response
  }

  async unlinkSubUser(data) {
    const response = await restApiService.userApi.apiV1UsersUnlinkSubUserPatch(data)

    return response
  }

  async getMySubUsers() {
    const response = await restApiService.userApi.apiV1UsersMySubUsersGet()

    return response
  }

  async getUserSettingsMy() {
    const response = await restApiService.userApi.apiV1UsersUserSettingsMyGet()

    return response
  }

  async createUserSettings(data) {
    const response = await restApiService.userApi.apiV1UsersUserSettingsPost(data)

    return response
  }

  async editUserSettings(id, data) {
    const response = await restApiService.userApi.apiV1UsersUserSettingsMyPatch(id, data)

    return response
  }
}

export const UserModel = new UserModelStatic()
