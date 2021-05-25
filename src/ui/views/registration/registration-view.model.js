import {makeAutoObservable, runInAction} from 'mobx'

import {AuthenticationModel} from '@models/authentication-model'

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
    makeAutoObservable(this)
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
        this.requestStatus = 'isLoading'
        this.error = undefined
      })
      await AuthenticationModel.signUp(this.email, this.email, this.password) // TODO: change first parametr to name
      runInAction(() => {
        this.requestStatus = 'success'
      })
      setTimeout(() => {
        this.history.push('/auth')
      }, delayRedirectToAuthTime)
    } catch (error) {
      console.log('RegistrationViewModel, onSubmitForm: Cought error', error)
      runInAction(() => {
        this.requestStatus = 'failed'
        this.error = error
      })
    }
  }
}
