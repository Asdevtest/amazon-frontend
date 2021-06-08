import {action, makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {UserModel} from '@models/user-model'

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
      await UserModel.signUp(this.email, this.email, this.password) // TODO: change first parametr to name
      this.requestStatus = loadingStatuses.success
      setTimeout(() => {
        this.history.push('/auth')
      }, delayRedirectToAuthTime)
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      this.error = error
    }
  }
}
