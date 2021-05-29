import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {UserModel} from '@models/user-model'

import {getLoggerServiceModel} from '@services/logger-service'

import {getObjectKeys} from '@utils/object'

const delayRedirectToAuthTime = 1000

export class RegistrationViewModel {
  history = undefined

  email = ''
  password = ''
  confirmPassword = ''
  acceptTerms = false

  requestStatus = undefined
  error = undefined

  formValidationErrors = {
    email: null,
    password: null,
    confirmPassword: null,
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
      await UserModel.signUp(this.email, this.email, this.password) // TODO: change first parametr to name
      runInAction(() => {
        this.requestStatus = loadingStatuses.success
      })
      setTimeout(() => {
        this.history.push('/auth')
      }, delayRedirectToAuthTime)
    } catch (error) {
      this.logger.logCoughtError('onSubmitForm', error)
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
        this.error = error
      })
    }
  }
}
