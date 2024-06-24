import { action, makeAutoObservable, reaction } from 'mobx'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { privateRoutesConfigs } from '@constants/navigation/routes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { getObjectKeys } from '@utils/object'
import { setI18nConfig, t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class AuthViewModel {
  history = undefined
  requestStatus = loadingStatus.SUCCESS

  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  email = ''
  password = ''
  remember = false
  language = ''

  formValidationErrors = {
    email: null,
    password: null,
  }

  get disableLoginButton() {
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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await UserModel.signIn(this.email.toLowerCase(), this.password)
      await UserModel.getUserInfo()
      await UserModel.getUsersInfoCounters()

      if (UserModel.accessToken) {
        const allowedRoutes = privateRoutesConfigs.filter(route =>
          route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]),
        )

        this.history.push(allowedRoutes[0].routePath)
      }

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onClickThemeIcon = theme => {
    SettingsModel.setUiTheme(theme)
  }

  onClickVersion() {
    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey.Attention) + '!',
      confirmMessage: t(TranslationKey['Temporary session data will be reset']),
      onClickConfirm: () => {
        SettingsModel.resetLocalStorageAndCach()
        this.onToggleModal()
      },
    }

    this.onToggleModal()
  }

  onToggleModal() {
    this.showConfirmModal = !this.showConfirmModal
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
