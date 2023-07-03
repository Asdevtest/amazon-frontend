import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'
import { SupplierModel } from '@models/supplier-model'
import { AdministratorModel } from '@models/administrator-model'

export class AdminSettingsPaymentMethodsModel {
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

  paymentMethods = []
  imageUrl = ''
  imageName = ''

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getPaymentMethods()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getPaymentMethods() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = toJS(result)
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async createPaymentMethod(paymentMethod) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await SupplierModel.addSuppliersPaymentMethod(paymentMethod)

      this.infoModalText = t(TranslationKey['Payment method successfully saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.infoModalText = t(TranslationKey['Payment method is not saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async removePaymentMethod(id) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removePaymentMethod(id)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onImageUpload(event) {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    if (file) {
      reader.onload = e => {
        if (e?.target && e?.target?.result) {
          this.imageUrl = e.target.result.toString()
          this.imageName = file.name
        }
      }

      reader.readAsDataURL(file)
    }
  }

  onRemoveImage() {
    this.imageUrl = ''
    this.imageName = ''
  }

  onClickRemovePaymentMethod(id) {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the payment method?']),
      onClickSuccess: () => this.removePaymentMethod(id),
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
