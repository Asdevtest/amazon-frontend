import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { privateRoutesConfigs } from '@constants/navigation/routes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

import { FieldType } from './auth-view.type'

export class AuthViewModel {
  history?: HistoryType
  auth = true

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor({ history, auth }: { history: HistoryType; auth: boolean }) {
    this.history = history
    this.auth = auth

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onSubmitForm(value: FieldType) {
    this.auth ? this.onLogin(value) : this.onRegister(value)
  }

  async onRegister(value: FieldType) {
    try {
      const requestData = { name: value?.name, email: value?.email?.toLowerCase(), password: value?.password }

      await UserModel.signUp(requestData)

      toast.success(t(TranslationKey['Successful registration']))

      this.onRedirect()
    } catch (error) {
      console.error(error)
    }
  }

  async onLogin(value: FieldType) {
    try {
      const requestData = { email: value?.email?.toLowerCase(), password: value?.password }

      await UserModel.signIn(requestData)
      await UserModel.getUserInfo()
      await UserModel.getUsersInfoCounters()

      if (UserModel.accessToken) {
        const allowedRoutes = privateRoutesConfigs.filter(route =>
          route?.permission?.includes(UserRoleCodeMap[this.userInfo?.role]),
        )

        this.history?.push(allowedRoutes[0].routePath)
      }

      toast.success(t(TranslationKey['Successful login']))
    } catch (error: any) {
      console.log({ ...error })
    }
  }

  onRedirect = () => {
    const path = this.auth ? '/registration' : '/auth'

    this.history?.push(path)
  }

  onChangeTheme = () => {
    const currentTheme = SettingsModel.uiTheme === UiTheme.light ? UiTheme.dark : UiTheme.light
    SettingsModel.setUiTheme(currentTheme)
  }

  onClickVersion = () => {
    SettingsModel.resetLocalStorageAndCach()
  }

  /* async onSubmitForm2() {
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
  } */
}
