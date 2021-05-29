/* eslint-disable no-caller */
import {makeAutoObservable, runInAction} from 'mobx'

import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {makePersistableModel} from '@utils/make-persistable-model'

import {UserSignInDataContract, UserInfoContract} from './user-model.contracts'

const persistProperties = ['accessToken', 'userInfo']

class UserModelStatic {
  accessToken = undefined
  userInfo = undefined

  logger = undefined

  isAuthenticated() {
    return !!this.accessToken
  }

  constructor() {
    makeAutoObservable(this)
    makePersistableModel(this, {
      properties: persistProperties,
    })
    this.logger = getLoggerServiceModel(this)
  }

  signOut = () => {
    runInAction(() => {
      this.accessToken = undefined
      this.userInfo = undefined
    })
    restApiService.removeAccessToken()
  }

  signIn = async (email, password) => {
    try {
      const response = await restApiService.userApi.apiV1UsersSignInPost({
        email,
        password,
      })
      this.logger.logResponse('signIn', response)
      const userSignInData = ApiClient.convertToType(response, UserSignInDataContract)
      const accessToken = userSignInData.token
      runInAction(() => {
        this.accessToken = accessToken
      })
      restApiService.setAccessToken(accessToken)
    } catch (error) {
      this.logger.logCoughtError('signIn', error)
      throw error
    }
  }

  signUp = async (name, email, password) => {
    try {
      const response = await restApiService.userApi.apiV1UsersPost({
        name,
        email,
        password,
      })
      this.logger.logResponse('signUp', response)
      runInAction(() => {
        this.userInfo = ApiClient.convertToType(response, UserInfoContract)
      })
    } catch (error) {
      this.logger.logCoughtError('signUp', error)
      throw error
    }
  }

  getUserInfo = async () => {
    try {
      const response = restApiService.userApi.apiV1UsersInfoGet()
      this.logger.logResponse('getUserInfo', response)
      this.userInfo = ApiClient.convertToType(response, UserInfoContract)
    } catch (error) {
      this.logger.logCoughtError('getUserInfo', error)
      throw error
    }
  }
}

export const UserModel = new UserModelStatic()
