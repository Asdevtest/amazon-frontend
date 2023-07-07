import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

export class AdminSettingsMainModel {
  history = undefined

  requestStatus = ''

  serverProxy = []
  get user() {
    return UserModel.userInfo
  }
  showAsinCheckerModal = false

  infoModalText = ''
  showInfoModal = false

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getServerProxy()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async createProxy(proxy) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.createProxy(proxy)

      this.infoModalText = t(TranslationKey['Proxy successfully saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.infoModalText = t(TranslationKey['Proxy is not saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getServerProxy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await AdministratorModel.getProxy()

      runInAction(() => {
        this.serverProxy = result
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onClickToggleInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
  }
  onClickToggleProxyModal() {
    this.onTriggerOpenModal('showAsinCheckerModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
