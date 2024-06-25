import { transformAndValidate } from 'class-transformer-validator'
import { action, makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'
import { UserRegistrationContract } from '@models/user-model/user-model.contracts'

import { getObjectKeys } from '@utils/object'
import { setI18nConfig, t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class RegistrationViewModel {
  requestStatus = undefined
  history = undefined

  name = ''
  email = ''
  password = ''
  confirmPassword = ''
  acceptTerms = false
  checkValidationNameOrEmail = {
    emailIsUnique: true,
    nameIsUnique: true,
  }
  language = ''

  formValidationErrors = {
    email: null,
    password: null,
    confirmPassword: null,
  }

  get disableRegisterButton() {
    return this.requestStatus === loadingStatus.IS_LOADING
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => SettingsModel.languageTag,
      () => this.onLoadPage(),
    )
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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await UserModel.isCheckUniqueUser({ name: this.name, email: this.email.toLowerCase() })

      runInAction(() => {
        this.checkValidationNameOrEmail = result
      })

      if (this.checkValidationNameOrEmail.emailIsUnique && this.checkValidationNameOrEmail.nameIsUnique) {
        const requestData = { name: this.name, email: this.email.toLowerCase(), password: this.password }

        await transformAndValidate(UserRegistrationContract, requestData)

        await UserModel.signUp(requestData)

        toast.success(t(TranslationKey['Successful registration']))

        this.history.push('/auth')
      }

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onLoadPage() {
    this.language = SettingsModel.languageTag

    SettingsModel.setLanguageTag(this.language)
    setI18nConfig()
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
      runInAction(() => {
        if (this.name === '' || this.email === '') {
          this.checkValidationNameOrEmail = undefined
        }
      })
    }
  }

  onClickThemeIcon = theme => {
    SettingsModel.setUiTheme(theme)
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
