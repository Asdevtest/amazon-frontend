import {makeAutoObservable, runInAction} from 'mobx'

import {TranslationKey} from '@constants/translations/translation-key'

import {AdministratorModel} from '@models/administrator-model'

import {t} from '@utils/translations'

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

      this.infoModalText = t(TranslationKey['The settings are saved.'])
      this.onTriggerOpenModal('showInfoModal')

      await this.getAdminSettings()
    } catch (error) {
      console.log(error)

      this.infoModalText = t(TranslationKey['The settings are not saved!'])
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
