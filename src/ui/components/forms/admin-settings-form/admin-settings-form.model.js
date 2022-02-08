import {makeAutoObservable, runInAction} from 'mobx'

import {AdministratorModel} from '@models/administrator-model'

export class AdminSettingsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  adminSettings = {}

  showSuccessModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await this.getAdminSettings()
    } catch (error) {
      console.log(error)
    }
  }

  async getAdminSettings() {
    try {
      const result = await AdministratorModel.getSettings()

      runInAction(() => {
        this.adminSettings = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createAdminSettings(data) {
    try {
      await AdministratorModel.setSettings(data)

      await this.getAdminSettings()
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
