import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {UserModel} from '@models/user-model'

import {getLoggerServiceModel} from '@services/logger-service'

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

  logger = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this)
    this.logger = getLoggerServiceModel(this)
  }

  get hasFormErrors() {
    return getObjectKeys(this.formValidationErrors).every(error => this.formValidationErrors[error])
  }

  setField = fieldName => value => {
    runInAction(() => {
      this.formValidationErrors[fieldName] = null
      this[fieldName] = value
    })
  }

  onSubmitForm = async () => {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
        this.error = undefined
      })
      await UserModel.signIn(this.email, this.password)
      if (UserModel.accessToken) {
        runInAction(() => {
          this.requestStatus = loadingStatuses.success
        })
      } else {
        runInAction(() => {
          this.requestStatus = loadingStatuses.failed
          this.error = new Error('No accessToken in response')
        })
      }
    } catch (error) {
      this.logger.logCoughtError('onSubmitForm', error)
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
        this.error = error
      })
    }
  }

  reset
}
