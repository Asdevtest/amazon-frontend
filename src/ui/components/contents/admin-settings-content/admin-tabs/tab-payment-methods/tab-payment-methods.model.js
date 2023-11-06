import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { SupplierModel } from '@models/supplier-model'

import { checkIsImageUrlValid } from '@utils/checks'
import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

export class AdminSettingsPaymentMethodsModel {
  requestStatus = undefined

  infoModalText = undefined
  showInfoModal = false
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  paymentMethods = []
  method = { title: '', iconImage: '' }
  isValidUrl = false
  currentImageName = undefined

  isEdit = false
  editPaymentMethodId = undefined

  constructor() {
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

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method successfully saved'])
      })

      this.onClickToggleInfoModal()

      await this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method is not saved'])
      })

      this.onClickToggleInfoModal()

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async editPaymentMethod(id, paymentMethod) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await SupplierModel.editSuppliersPaymentMethod(id, paymentMethod)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method successfully saved'])
      })

      this.onClickToggleInfoModal()

      await this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method is not saved'])
      })

      this.onClickToggleInfoModal()

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onRemovePaymentMethod(id) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removePaymentMethod(id)

      this.onClickToggleConfirmModal()

      await this.loadData()

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

    this.onClickToggleConfirmModal()
  }

  async onClickEditPaymentMethod(id) {
    this.isEdit = true
    this.editPaymentMethodId = id

    const findPaymentMethod = this.paymentMethods.find(method => method._id === id)

    if (findPaymentMethod) {
      this.method = { title: findPaymentMethod.title, iconImage: findPaymentMethod.iconImage }
      this.currentImageName = findPaymentMethod.title

      const isValidImageUrl = await checkIsImageUrlValid(findPaymentMethod.iconImage)

      runInAction(() => {
        this.isValidUrl = isValidImageUrl
      })
    }
  }

  async onSubmitPaymentMethod() {
    const result =
      typeof this.method.iconImage === 'string'
        ? await uploadFileByUrl(this.method.iconImage)
        : await onPostImage(this.method.iconImage)

    runInAction(() => {
      this.method.iconImage = result
    })

    this.isEdit ? this.editPaymentMethod(this.editPaymentMethodId, this.method) : this.createPaymentMethod(this.method)

    runInAction(() => {
      this.method = { title: '', iconImage: '' }
    })
    this.isEdit = false
    this.editPaymentMethodId = undefined
  }

  onChangeTitle(event) {
    this.method.title = event.target.value
  }

  async onChangeIconImage(event) {
    this.currentImageName = this.method.title
    this.method.iconImage = event.target.value

    const isValidImageUrl = await checkIsImageUrlValid(event.target.value)

    runInAction(() => {
      this.isValidUrl = isValidImageUrl
    })
  }

  onRemoveImg() {
    this.method.iconImage = ''
  }

  onImageUpload(event) {
    const file = event.target.files[0]
    const reader = new FileReader()

    if (file) {
      this.currentImageName = file.name

      reader.onload = async e => {
        const isValidImageUrl = await checkIsImageUrlValid(e.target.result)

        runInAction(() => {
          this.isValidUrl = isValidImageUrl
          this.method.iconImage = {
            data_url: e.target.result,
            file,
          }
        })
      }

      event.target.value = ''

      reader.readAsDataURL(file)
    } else {
      this.method.iconImage = ''
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
