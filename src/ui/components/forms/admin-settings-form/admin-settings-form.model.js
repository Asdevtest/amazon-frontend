import {makeAutoObservable, runInAction} from 'mobx'

import {AdministratorModel} from '@models/administrator-model'

export class AdminSettingsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  adminSettings = {}
  infoModalText = ''

  showSuccessModal = false
  showInfoModal = false

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

      this.infoModalText = 'Настройки сохранены.'
      this.onTriggerOpenModal('showInfoModal')

      await this.getAdminSettings()
    } catch (error) {
      console.log(error)

      this.infoModalText = 'Настройки не сохранены!'
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
