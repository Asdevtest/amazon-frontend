import {makeAutoObservable, runInAction} from 'mobx'

import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {makePersistableModel} from '@utils/make-persistable-model'

import {UserSignInDataContract, UserInfoContract} from './user-model.contracts'

const persistProperties = ['accessToken', 'userInfo']

class UserModelStatic {
  accessToken = undefined
  userInfo = undefined

  // [UserRole.ADMIN]: '-=test_token=-:60aac071b2f06d5a147ba00c',
  // [UserRole.CLIENT]: '-=test_token=-:609001a82ba62f2d093d6344',      401
  // [UserRole.SUPERVISOR]: '-=test_token=-:609001a82ba62f2d093d6343',  401
  // [UserRole.RESEARCHER]: '-=test_token=-:60aabd92b2f06d5a147ba007',
  // [UserRole.BUYER]: '-=test_token=-:60aabf69b2f06d5a147ba009',
  // [UserRole.STOREKEEPER]: '-=test_token=-:60aabeeab2f06d5a147ba008',

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
    const userSignInData = ApiClient.convertToType(response, UserSignInDataContract)
    const accessToken = userSignInData.token
    this.accessToken = accessToken
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
