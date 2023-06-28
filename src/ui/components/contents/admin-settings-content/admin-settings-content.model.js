import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { SupplierModel } from '@models/supplier-model'

export class AdminSettingsModel {
  history = undefined

  requestStatus = ''

  serverProxy = []
  get user() {
    return UserModel.userInfo
  }
  showAsinCheckerModal = false

  infoModalText = ''
  showInfoModal = false

  adminSettings = {}

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

      await Promise.allSettled([this.getAdminSettings(), this.getServerProxy(), this.getPaymentMethods()])

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getAdminSettings() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await AdministratorModel.getSettings()

      runInAction(() => {
        this.adminSettings = result
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async createAdminSettings(data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.setSettings(data)

      this.infoModalText = t(TranslationKey['The settings are saved.'])

      this.onTriggerOpenModal('showInfoModal')

      await this.getAdminSettings()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.infoModalText = t(TranslationKey['The settings are not saved!'])

      this.onTriggerOpenModal('showInfoModal')

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async createProxy(proxy) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.createProxy(proxy)

      this.infoModalText = t(TranslationKey['Proxy successfully saved'])

      this.onTriggerOpenModal('showInfoModal')

      await this.getServerProxy()

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
        this.serverProxy = toJS(result)
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
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

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.infoModalText = t(TranslationKey['Payment method is not saved'])

      this.onTriggerOpenModal('showInfoModal')

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

  async onCloseInfoModal() {
    this.onTriggerOpenModal('showInfoModal')

    await this.loadData()
  }

  onToggleModalProxy() {
    this.showAsinCheckerModal = !this.showAsinCheckerModal
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
