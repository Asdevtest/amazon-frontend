import {action, makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {privateRoutesConfigs} from '@constants/routes'
import {UserRoleCodeMap} from '@constants/user-roles'

import {UserModel} from '@models/user-model'

import {getObjectKeys} from '@utils/object'

export class AuthViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  email = ''
  password = ''
  remember = false

  formValidationErrors = {
    email: null,
    password: null,
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  get hasFormErrors() {
    return getObjectKeys(this.formValidationErrors).every(error => this.formValidationErrors[error])
  }

  setField = fieldName =>
    action(value => {
      this.formValidationErrors[fieldName] = null
      this[fieldName] = value
    })

  async onSubmitForm() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      await UserModel.signIn(this.email, this.password)
      await UserModel.getUserInfo()
      if (UserModel.accessToken) {
        this.requestStatus = loadingStatuses.success
        const allowedRoutes = privateRoutesConfigs.filter(route =>
          route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]),
        )
        this.history.push(allowedRoutes[0].routePath)
      } else {
        this.requestStatus = loadingStatuses.failed
        this.error = new Error('No accessToken in response')
      }
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      this.error = error
    }
  }
}
