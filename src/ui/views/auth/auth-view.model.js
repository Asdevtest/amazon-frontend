import { action, makeAutoObservable, reaction, runInAction } from 'mobx'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { privateRoutesConfigs } from '@constants/navigation/routes'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { getObjectKeys } from '@utils/object'
import { setI18nConfig, t } from '@utils/translations'

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

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
    reaction(
      () => SettingsModel.languageTag,
      () => this.onLoadPage(),
    )
  }

  onLoadPage() {
    runInAction(() => {
      this.language = SettingsModel.languageTag
    })

    SettingsModel.setLanguageTag(this.language)

    setI18nConfig()
  }

  get hasFormErrors() {
    return getObjectKeys(this.formValidationErrors).every(error => this.formValidationErrors[error])
  }

  setField = fieldName =>
    action(value => {
      runInAction(() => {
        this.formValidationErrors[fieldName] = null
      })

      if (fieldName === 'remember') {
        runInAction(() => {
          this[fieldName] = !this.remember
        })
      } else {
        runInAction(() => {
          this[fieldName] = value
        })
      }
    })

  async onSubmitForm() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
        this.error = undefined
      })
      await UserModel.signIn(this.email.toLowerCase(), this.password)
      await UserModel.getUserInfo()
      if (UserModel.accessToken) {
        runInAction(() => {
          this.requestStatus = loadingStatuses.success
        })
        const allowedRoutes = privateRoutesConfigs.filter(route =>
          route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]),
        )
        this.history.push(allowedRoutes[0].routePath)
      } else {
        runInAction(() => {
          this.requestStatus = loadingStatuses.failed
          this.error = new Error('The user is waiting for confirmation by the Administrator')
        })
      }
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
        this.error = error
      })
    }
  }
}
