import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {UserModel} from '@models/user-model'
import {UserRegistrationContract} from '@models/user-model/user-model.contracts'

import {getObjectKeys} from '@utils/object'

const delayRedirectToAuthTime = 1000

export class RegistrationViewModel {
  history = undefined

  name = ''
  email = ''
  password = ''
  confirmPassword = ''
  acceptTerms = false
  checkValidationNameOrEmail = {}

  requestStatus = undefined
  error = undefined
  showErrorRegistrationModal = false
  showSuccessRegistrationModal = false

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
      const result = await UserModel.isCheckUniqueUser({name: this.name, email: this.email.toLowerCase()})

      runInAction(() => {
        this.checkValidationNameOrEmail = result
      })

      const requestData = {name: this.name, email: this.email.toLowerCase(), password: this.password}

      await transformAndValidate(UserRegistrationContract, requestData)

      await UserModel.signUp(requestData)

      this.onTriggerOpenModal('showSuccessRegistrationModal')

      this.requestStatus = loadingStatuses.success

      setTimeout(() => {
        this.history.push('/auth')
      }, delayRedirectToAuthTime)
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  onClickRedirect = () => {
    this.history.push('/auth')
  }

  onChangeFormField = fieldName => event => {
    if (fieldName === 'acceptTerms') {
      this.setField(fieldName)(!this.acceptTerms)
    } else if (fieldName === 'name') {
      this.setField(fieldName)(event.target.value.replace(/^\s+|\s(?=\s)/g, ''))
    } else {
      this.setField(fieldName)(event.target.value)
      if (this.name === '' || this.email === '') {
        this.checkValidationNameOrEmail = {}
      }
    }
  }
}
