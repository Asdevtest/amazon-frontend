import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { SupplierModel } from '@models/supplier-model'

import { checkIsImageUrlValid } from '@utils/checks'
import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { isString } from '@typings/type-guards'

export class AdminSettingsPaymentMethodsModel {
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

  loadData() {
    try {
      this.getPaymentMethods()
    } catch (error) {
      console.log(error)
    }
  }

  async getPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createPaymentMethod(paymentMethod) {
    try {
      await SupplierModel.addSuppliersPaymentMethod(paymentMethod)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method successfully saved'])
      })

      this.onClickToggleInfoModal()

      this.loadData()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method is not saved'])
      })

      this.onClickToggleInfoModal()
    }
  }

  async editPaymentMethod(id, paymentMethod) {
    try {
      await SupplierModel.editSuppliersPaymentMethod(id, paymentMethod)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method successfully saved'])
      })

      this.onClickToggleInfoModal()

      this.loadData()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Payment method is not saved'])
      })

      this.onClickToggleInfoModal()
    }
  }

  async onRemovePaymentMethod(id) {
    try {
      await AdministratorModel.removePaymentMethod(id)

      this.onClickToggleConfirmModal()

      this.loadData()
    } catch (error) {
      console.log(error)
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
    runInAction(() => {
      this.isEdit = true
      this.editPaymentMethodId = id
    })

    const findPaymentMethod = this.paymentMethods.find(method => method._id === id)

    if (findPaymentMethod) {
      runInAction(() => {
        this.method = { title: findPaymentMethod.title, iconImage: findPaymentMethod.iconImage }
        this.currentImageName = findPaymentMethod.title
      })

      const isValidImageUrl = await checkIsImageUrlValid(findPaymentMethod.iconImage)

      runInAction(() => {
        this.isValidUrl = isValidImageUrl
      })
    }
  }

  async onSubmitPaymentMethod() {
    const result = isString(this.method.iconImage)
      ? await uploadFileByUrl(this.method.iconImage)
      : await onPostImage(this.method.iconImage)

    runInAction(() => {
      this.method.iconImage = result
    })

    this.isEdit ? this.editPaymentMethod(this.editPaymentMethodId, this.method) : this.createPaymentMethod(this.method)

    runInAction(() => {
      this.method = { title: '', iconImage: '' }
      this.isEdit = false
      this.editPaymentMethodId = undefined
    })
  }

  onChangeTitle(event) {
    this.method.title = event.target.value
  }

  async onChangeIconImage(event) {
    runInAction(() => {
      this.currentImageName = this.method.title
      this.method.iconImage = event.target.value
    })

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
