import {action, makeAutoObservable, reaction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {privateRoutesConfigs} from '@constants/routes'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap} from '@constants/user-roles'

import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {getObjectKeys} from '@utils/object'
import {setI18nConfig, t} from '@utils/translations'

export class AuthViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  email = ''
  password = ''
  remember = false
  language = ''

  formValidationErrors = {
    email: null,
    password: null,
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.onLoadPage(),
    )
  }

  onLoadPage() {
    this.language = SettingsModel.languageTag

    SettingsModel.setLanguageTag(this.language)

    setI18nConfig()
  }

  get hasFormErrors() {
    return getObjectKeys(this.formValidationErrors).every(error => this.formValidationErrors[error])
  }

  setField = fieldName =>
    action(value => {
      this.formValidationErrors[fieldName] = null

      if (fieldName === 'remember') {
        this[fieldName] = !this.remember
      } else {
        this[fieldName] = value
      }
    })

  async onSubmitForm() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      await UserModel.signIn(this.email.toLowerCase(), this.password)
      await UserModel.getUserInfo()
      if (UserModel.accessToken) {
        this.requestStatus = loadingStatuses.success
        const allowedRoutes = privateRoutesConfigs.filter(route =>
          route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]),
        )
        this.history.push(allowedRoutes[0].routePath)
      } else {
        this.requestStatus = loadingStatuses.failed
        this.error = new Error(t(TranslationKey['The user is waiting for confirmation by the Administrator']))
      }
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      this.error = error
    }
  }
}
