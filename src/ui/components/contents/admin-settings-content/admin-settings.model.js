import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { fieldsWithoutCharsAfterDote, startValueFields } from './admin-settings.constants'

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

  formFields = startValueFields
  prevFormFields = {}

  tabIndex = 0

  isFormFieldsChanged = false

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getAdminSettings()

      await this.getServerProxy()

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
        this.formFields = result?.dynamicSettings
        this.prevFormFields = result?.dynamicSettings
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onCreateAdminSettings() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.setSettings(this.formFields)

      this.loadData()

      this.isFormFieldsChanged = false

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
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

    this.isFormFieldsChanged = this.prevFormFields[fieldName] !== Number(event.target.value)
  }

  onChangeTab(_, selectedTab) {
    this.tabIndex = selectedTab
  }

  async onCreateProxy(proxy) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.createProxy(proxy)

      this.infoModalText = t(TranslationKey['The settings are saved.'])

      this.onTriggerOpenModal('showInfoModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.infoModalText = t(TranslationKey['The settings are not saved!'])

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

  onSubmitMain(proxy) {
    this.onCreateAdminSettings()
    this.onCreateProxy(proxy)
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
