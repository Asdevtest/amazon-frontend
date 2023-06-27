import { makeAutoObservable, runInAction } from 'mobx'

import { UserModel } from '@models/user-model'

export class UserSettingsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  get userId() {
    return UserModel.userInfo?._id
  }

  userSettings = undefined
  sourceUserSettings = undefined
  userSettingsAvailable = []

  showSuccessModal = false

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      await Promise.all([this.getUserSettingsMy(), this.getUserSettingsAvailable()])
    } catch (error) {
      console.log(error)
    }
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
      console.log(error)
    }
  }

  async getUserSettingsAvailable() {
    try {
      const result = await UserModel.getUserSettingsAvailable()

      runInAction(() => {
        this.userSettingsAvailable = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createUserSettings(data) {
    try {
      await UserModel.createUserSettings({ settingOwnerId: this.userId, data })

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  async editUserSettings(data) {
    try {
      await UserModel.editUserSettings(this.userId, { settingOwnerId: this.userId, data })

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
