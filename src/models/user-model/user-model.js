import {makeAutoObservable, runInAction} from 'mobx'

import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {makePersistableModel} from '@utils/make-persistable-model'

import {UserInfoContract} from './user-model.contracts'

const persistProperties = ['accessToken', 'userInfo']

class UserModelStatic {
  accessToken = undefined
  userInfo = undefined
  isHydrated = false

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistableModel(this, {properties: persistProperties}).then(persistStore => {
      runInAction(() => {
        this.isHydrated = persistStore.isHydrated
        if (this.accessToken) {
          restApiService.setAccessToken(this.accessToken)
          this.getUserInfo()
        }
      })
    })
    restApiService.setAccessToken(this.accessToken) // TODO: для тестирования
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
      email,
      password,
    })
    const accessToken = response.token
    runInAction(() => {
      this.accessToken = accessToken
    })
    restApiService.setAccessToken(accessToken)
  }

  async signUp({name, email, password}) {
    const response = await restApiService.userApi.apiV1UsersPost({
      name,
      email,
      password,
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
}

export const UserModel = new UserModelStatic()
