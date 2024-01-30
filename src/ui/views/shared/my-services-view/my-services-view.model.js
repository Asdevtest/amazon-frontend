import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { Specs } from '@typings/enums/specs'

import { filterFields } from './my-services-view.constants'

export class MyServicesViewModel {
  history = undefined
  requestStatus = undefined

  showAcceptMessage = null
  acceptMessage = null

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
    error: false,
  }

  selectedSpec = Specs.DEFAULT

  specs = []
  announcements = []

  nameSearchValue = undefined

  showConfirmModal = false
  selectedProposal = undefined

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  showImageModal = false

  columnMenuSettings = {
    onClickFilterBtn: () => {},
    onChangeFullFieldMenuItem: () => {},
    onClickAccept: () => {},

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filterFields),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get userRole() {
    return UserRoleCodeMap[this.userInfo.role]
  }

  get currentData() {
    if (this.nameSearchValue) {
      return this.announcements.filter(
        el =>
          el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.description.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return this.announcements
    }
  }

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.alertShieldSettings = {
        showAlertShield: history.location?.state?.showAcceptMessage,
        alertShieldMessage: history.location?.state?.acceptMessage,
        error: history.location?.state?.error,
      }

      const state = { ...history.location.state }
      delete state.acceptMessage
      delete state.showAcceptMessage
      delete state.error
      history.replace({ ...history.location, state })
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    if (this.alertShieldSettings.showAlertShield) {
      setTimeout(() => {
        this.alertShieldSettings = {
          ...this.alertShieldSettings,
          showAlertShield: false,
        }

        setTimeout(() => {
          this.alertShieldSettings = {
            showAlertShield: false,
            alertShieldMessage: '',
            error: false,
          }
        }, 1000)
      }, 3000)
    }
  }

  loadData() {
    try {
      this.getMyAnnouncementsData()
      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filterFields, []),
    )
  }

  async getMyAnnouncementsData() {
    try {
      const response = await AnnouncementsModel.getMyAnnouncements({
        filters: this.getFilter(),
      })

      runInAction(() => {
        this.announcements = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickCreateServiceBtn() {
    this.history.push(`/freelancer/freelance/my-services/create-service`)
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickSpec(specType) {
    this.selectedSpec = specType

    // spec - for "_id:string", specType - for "type:number"
    this.onChangeFullFieldMenuItem(specType === Specs.DEFAULT ? [] : [specType], 'specType', true)

    this.getMyAnnouncementsData()
  }

  onChangeViewMode(value) {
    this.viewMode = value

    this.setTableModeState()
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_SERVICES)
  }

  onClickOpenButton(data) {
    this.history.push(`/freelancer/freelance/my-services/service-detailds?serviceId=${data._id}`)
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  onSearchSubmit(e) {
    this.nameSearchValue = e.target.value
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.log(error)
    }
  }
}
