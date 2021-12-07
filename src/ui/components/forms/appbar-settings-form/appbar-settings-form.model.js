import {makeAutoObservable, runInAction} from 'mobx'

import {UserModel} from '@models/user-model'

export class AppbarSettingsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  get userId() {
    return UserModel.userInfo?._id
  }

  userSettings = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await this.getUserSettingsMy()
    } catch (error) {
      console.log(error)
    }
  }

  onChangeField = fieldName => event => {
    const newFormFields = {...this.userSettings}

    newFormFields[fieldName] = event.target.value

    this.userSettings = newFormFields
  }

  async getUserSettingsMy() {
    try {
      const result = await UserModel.getUserSettingsMy()

      runInAction(() => {
        this.userSettings = result.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createUserSettings(data) {
    try {
      await UserModel.createUserSettings({settingOwnerId: this.userId, data})
    } catch (error) {
      console.log(error)
    }
  }

  async editUserSettings(data) {
    try {
      await UserModel.editUserSettings(this.userId, {data})
    } catch (error) {
      console.log(error)
    }
  }
}
