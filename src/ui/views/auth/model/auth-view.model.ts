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

import { FieldData } from './types/field'

export class AuthViewModel {
  history?: HistoryType
  auth = true
  loading = false

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor({ history, auth }: { history: HistoryType; auth: boolean }) {
    this.history = history
    this.auth = auth

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onSubmitForm(value: FieldData) {
    this.loading = true
    this.auth ? await this.onLogin(value) : await this.onRegister(value)
    this.loading = false
  }

  async onRegister(value: FieldData) {
    try {
      const requestData = { name: value?.name, email: value?.email?.toLowerCase(), password: value?.password }

      await UserModel.signUp(requestData)

      toast.success(t(TranslationKey['Successful registration']))

      this.onRedirect()
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(t(TranslationKey[error?.response.data.message as TranslationKey]))
      }
    }
  }

  async onLogin(value: FieldData) {
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
      if (error?.response?.data?.message) {
        toast.error(t(TranslationKey[error?.response.data.message as TranslationKey]))
      }
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
}
