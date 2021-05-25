import {makeAutoObservable, runInAction} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {SignInEmailModel} from './sign-in-email.model'
import {SignUpEmailModel} from './sign-up-email.model'

const persistStorageName = 'AuthenticationModel'
const persistProperties = ['accessToken', 'refreshToken']

class AuthenticationModelStatic {
  accessToken = undefined
  refreshToken = undefined

  authModel = undefined

  isAuthenticated() {
    return !!this.accessToken
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: persistStorageName,
      properties: persistProperties,
    })
  }

  signOut = () => {
    this.accessToken = undefined
    this.refreshToken = undefined
  }

  signIn = async (email, password) => {
    try {
      this.authModel = new SignInEmailModel()
      await this.authModel.signIn(email, password)
      runInAction(() => {
        this.accessToken = this.authModel.successResponse.token
      })
    } catch (error) {
      console.log(`AuthenticationModelStatic, signIn: Cought error`, error)
      throw error
    }
  }

  signUp = async (name, email, password) => {
    try {
      this.authModel = new SignUpEmailModel()
      await this.authModel.signUp(name, email, password)
    } catch (error) {
      console.log(`AuthenticationModelStatic, signUp: Cought error`, error)
      throw error
    }
  }
}

export const AuthenticationModel = new AuthenticationModelStatic()
