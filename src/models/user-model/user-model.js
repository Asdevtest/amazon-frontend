import {makeAutoObservable, runInAction} from 'mobx'

import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {makePersistableModel} from '@utils/make-persistable-model'

import {UserInfoContract} from './user-model.contracts'

const persistProperties = ['accessToken', 'userInfo']

class UserModelStatic {
  accessToken = '-=test_token=-:60f5569e7c89b06e3da60451'
  userInfo = undefined

  // [UserRole.STOREKEEPER]: "Bearer -=test_token=-:60f448b7df1b21433de554b7",
  // [UserRole.RESEARCHER]: "Bearer -=test_token=-:60f4487cdf1b21433de554b5",
  // [UserRole.BUYER]: "Bearer -=test_token=-:60f44898df1b21433de554b6",
  // [UserRole.SUPERVISOR]: "Bearer -=test_token=-:60f448c9df1b21433de554b8",
  // [UserRole.CLIENT]: "Bearer -=test_token=-:60f448ebdf1b21433de554b9",
  // [UserRole.ADMIN]: "Bearer -=test_token=-:60f448fadf1b21433de554ba"

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistableModel(this, {properties: persistProperties})
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
      email,
      password,
    })
    const accessToken = response.token
    runInAction(() => {
      this.accessToken = accessToken
    })
    restApiService.setAccessToken(accessToken)
  }

  async signUp(name, email, password) {
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
