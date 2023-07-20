import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { SupplierModel } from '@models/supplier-model'

import { checkValidImageUrl } from '@utils/checks'
import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

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

  method = { title: '', iconImage: '' }
  paymentMethods = []
  isValidUrl = false
  currentImageName = ''

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
        this.paymentMethods = result
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

  async onRemovePaymentMethod(id) {
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

  onClickRemovePaymentMethod(id) {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the payment method?']),
      onClickSuccess: () => this.onRemovePaymentMethod(id),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitPaymentMethod() {
    const result =
      typeof this.method.iconImage === 'string'
        ? await uploadFileByUrl(this.method.iconImage)
        : await onPostImage(this.method.iconImage)

    const updatedMethod = { ...this.method, iconImage: result }

    this.createPaymentMethod(updatedMethod)

    this.method = { title: '', iconImage: '' }
  }

  onChangeTitle(event) {
    this.method = { ...this.method, title: event.target.value }
  }

  onChangeIconImage(event) {
    this.currentImageName = this.method.title
    this.method = { ...this.method, iconImage: event.target.value }

    const img = new Image()
    img.src = event.target.value
    img.onload = () => {
      this.isValidUrl = true
    }

    img.onerror = () => {
      this.isValidUrl = false
    }
  }

  onRemoveImg() {
    this.method = { ...this.method, iconImage: '' }
  }

  onImageUpload(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    if (file) {
      this.currentImageName = file.name

      reader.onload = e => {
        checkValidImageUrl(e.target.result, isValid => {
          this.isValidUrl = isValid
        })

        this.method = {
          ...this.method,
          iconImage: {
            data_url: e.target.result,
            file,
          },
        }
      }
      reader.readAsDataURL(file)
    }
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
