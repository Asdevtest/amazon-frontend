import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

export class UserSettingsModel {
  get userId() {
    return UserModel.userInfo?._id
  }

  userSettings = undefined
  sourceUserSettings = undefined
  userSettingsAvailable = []

  constructor() {
    this.loadData()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    this.getUserSettingsMy()
    this.getUserSettingsAvailable()
  }

  onChangeField = fieldName => event => {
    const newFormFields = { ...this.userSettings }
    newFormFields[fieldName] = event.target.value
    this.userSettings = newFormFields
  }

  async getUserSettingsMy() {
    try {
      const result = await UserModel.getUserSettingsMy()

      runInAction(() => {
        this.sourceUserSettings = result.data
        this.userSettings = result.data
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getUserSettingsAvailable() {
    try {
      const result = await UserModel.getUserSettingsAvailable()

      runInAction(() => {
        this.userSettingsAvailable = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createUserSettings() {
    try {
      await UserModel.createUserSettings({ settingOwnerId: this.userId, ...this.userSettings })

      toast.success(t(TranslationKey['Data accepted']))
    } catch (error) {
      console.error(error)
    }
  }

  async editUserSettings() {
    try {
      await UserModel.editUserSettings(this.userId, { settingOwnerId: this.userId, ...this.userSettings })

      toast.success(t(TranslationKey['Data accepted']))
    } catch (error) {
      console.error(error)
    }
  }
}
