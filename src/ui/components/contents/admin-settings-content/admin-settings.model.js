import isEqual from 'lodash.isequal'
import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { fieldsWithoutCharsAfterDote, startValueFields } from './admin-settings.constants'

export class AdminSettingsModel {
  requestStatus = undefined

  serverProxy = []

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

  get user() {
    return UserModel.userInfo
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getAdminSettings()

      this.getServerProxy()
    } catch (error) {
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getAdminSettings() {
    try {
      const response = await AdministratorModel.getSettings()

      runInAction(() => {
        this.formFields = response?.dynamicSettings
        this.prevFormFields = response?.dynamicSettings
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onCreateAdminSettings() {
    try {
      await AdministratorModel.setSettings(this.formFields)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The settings are saved.'])
      })

      this.onClickToggleInfoModal()

      this.getAdminSettings()

      runInAction(() => {
        this.isFormFieldsChanged = false
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The settings are not saved.'])
      })

      this.onClickToggleInfoModal()
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

    this.formFields[fieldName] = event.target.value

    this.isFormFieldsChanged = this.prevFormFields[fieldName] !== Number(event.target.value)
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
      const resolve = await AdministratorModel.getProxy()

      runInAction(() => {
        this.serverProxy = resolve
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onCreateProxy(proxy) {
    try {
      await AdministratorModel.createProxy(proxy)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The proxy servers are saved.'])
      })

      this.onClickToggleInfoModal()

      this.getServerProxy()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The proxy servers are not saved.'])
      })

      this.onClickToggleInfoModal()
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
