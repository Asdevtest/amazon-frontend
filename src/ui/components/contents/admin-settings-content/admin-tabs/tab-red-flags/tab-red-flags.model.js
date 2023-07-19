import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ProductModel } from '@models/product-model'

import { t } from '@utils/translations'

export class AdminSettingsRedFlagsModel {
  history = undefined
  requestStatus = ''

  infoModalText = ''
  showInfoModal = false
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  redFlags = []

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getRedFlags()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getRedFlags() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await ProductModel.getProductRedFlags()

      runInAction(() => {
        this.redFlags = result
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async createRedFlag(redFlag) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.createRedFlag(redFlag)

      this.infoModalText = t(TranslationKey['Red flag successfully saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.infoModalText = t(TranslationKey['Red flag is not saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async removeRedFlag(id) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removeRedFlag(id)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onClickRemoveRedFlag(id) {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the red flag?']),
      onClickSuccess: () => this.removeRedFlag(id),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickToggleInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
  }
  onClickToggleConfirmModal() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
