import {makeAutoObservable, runInAction} from 'mobx'

import {AuthenticationModel} from '@models/authentication-model'

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

  constructor() {
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
      await AuthenticationModel.signIn(this.email, this.password)
      if (AuthenticationModel.accessToken) {
        runInAction(() => {
          this.requestStatus = 'success'
        })
      } else {
        runInAction(() => {
          this.requestStatus = 'failed'
          this.error = new Error('No accessToken in response')
        })
      }
    } catch (error) {
      console.log('AuthViewModel, onSubmitForm: Cought error', error)
      runInAction(() => {
        this.requestStatus = 'failed'
        this.error = error
      })
    }
  }
}
