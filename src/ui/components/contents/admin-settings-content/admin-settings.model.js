import isEqual from 'lodash.isequal'
import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { fieldsWithoutCharsAfterDote, startValueFields } from './admin-settings.constants'

export class AdminSettingsModel {
  requestStatus = undefined

  serverProxy = []
  get user() {
    return UserModel.userInfo
  }
  showAsinCheckerModal = false

  infoModalText = ''
  showInfoModal = false
  showConfirmModal = false
  confirmModalSettings = {
    message: '',
    onClickSuccess: () => {},
    onClickFailed: () => {},
  }

  formFields = startValueFields
  prevFormFields = {}

  tabIndex = 0

  isFormFieldsChanged = false
  isProxyServersChanged = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await this.getAdminSettings()

      await this.getServerProxy()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getAdminSettings() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await AdministratorModel.getSettings()

      runInAction(() => {
        this.formFields = result?.dynamicSettings
        this.prevFormFields = result?.dynamicSettings
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onCreateAdminSettings() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await AdministratorModel.setSettings(this.formFields)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The settings are saved.'])
      })

      this.onClickToggleInfoModal()

      this.getAdminSettings()

      runInAction(() => {
        this.isFormFieldsChanged = false
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      runInAction(() => {
        this.infoModalText = t(TranslationKey['The settings are not saved.'])
      })

      this.onClickToggleInfoModal()

      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  onChangeField(fieldName, event) {
    if (
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(
        event.target.value,
        fieldsWithoutCharsAfterDote.includes(fieldName) ? 0 : 2,
      )
    ) {
      return
    }

    this.formFields = {
      ...this.formFields,
      [fieldName]: event.target.value,
    }

    runInAction(() => {
      this.isFormFieldsChanged = this.prevFormFields[fieldName] !== Number(event.target.value)
    })
  }

  onChangeTab(_, selectedTab) {
    this.tabIndex = selectedTab

    if (this.isFormFieldsChanged) {
      this.confirmModalSettings = {
        message: t(TranslationKey['You have changed the tab settings. Do you want to save them?']),
        onClickSuccess: () => {
          this.onCreateAdminSettings()
          this.onClickToggleConfirmModal()
        },
        onClickFailed: () => {
          this.isFormFieldsChanged = false
          this.formFields = this.prevFormFields
          this.onClickToggleConfirmModal()
        },
      }

      this.onClickToggleConfirmModal()
    }
  }

  async getServerProxy() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await AdministratorModel.getProxy()

      runInAction(() => {
        this.serverProxy = result
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onCreateProxy(proxy) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await AdministratorModel.createProxy(proxy)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The proxy servers are saved.'])
      })

      this.onClickToggleInfoModal()

      this.getServerProxy()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      runInAction(() => {
        this.infoModalText = t(TranslationKey['The proxy servers are not saved.'])
      })

      this.onClickToggleInfoModal()

      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  isEqualServerProxy(updatedServerProxy) {
    this.isProxyServersChanged = !isEqual(this.serverProxy, updatedServerProxy)
  }

  onSubmitMain(proxy) {
    if (this.isFormFieldsChanged) {
      this.onCreateAdminSettings()
    }

    if (this.isProxyServersChanged) {
      this.onCreateProxy(proxy)
    }
  }

  onClickToggleInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
  }

  onClickToggleProxyModal() {
    this.onTriggerOpenModal('showAsinCheckerModal')
  }

  onClickToggleConfirmModal() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
