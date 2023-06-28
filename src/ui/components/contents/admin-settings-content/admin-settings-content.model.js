import { makeAutoObservable, runInAction} from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { SupplierModel } from '@models/supplier-model'
import { fieldNames } from './constants'

export class AdminSettingsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  showAsinCheckerModal = false
  showConfirmModal = false

  adminSettings = {}

  serverProxy = []

  infoModalText = ''
  showSuccessModal = false

  imageUrl = ''
  imageName = ''

  paymentMethods = []

  sourceFormFields = {}

  showInfoModal = false

  get user() {
    return UserModel.userInfo
  }

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  initializeSourceFormFields() {
    fieldNames.forEach(fieldName => {
      this.sourceFormFields[fieldName] = this.adminSettings?.dynamicSettings?.[fieldName] || 0
    })
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await Promise.allSettled([this.getAdminSettings(), this.getServerProxy(), this.getPaymentMethods()])

      this.initializeSourceFormFields()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
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

  async getServerProxy() {
    try {
      const result = await AdministratorModel.getProxy()

      runInAction(() => {
        this.serverProxy = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getPaymentMethods() {
    try {
      const result = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createProxy(proxy) {
    try {
      await AdministratorModel.createProxy(proxy)

      this.infoModalText = t(TranslationKey['Proxy successfully saved'])
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      this.infoModalText = t(TranslationKey['Proxy is not saved'])
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async createPaymentMethod(paymentMethod) {
    try {
      await await SupplierModel.addSuppliersPaymentMethod(paymentMethod)

      this.infoModalText = t(TranslationKey['Payment method successfully saved'])
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      this.infoModalText = t(TranslationKey['Payment method is not saved'])
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async onCloseInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
    await this.loadData()
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
