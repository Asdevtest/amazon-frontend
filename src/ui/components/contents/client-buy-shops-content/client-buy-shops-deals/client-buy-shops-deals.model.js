import { makeAutoObservable, toJS } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

export class ClientBuyShopsDealsModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  nameSearchValue = ''

  drawerOpen = false

  searchMyRequestsIds = []
  requests = []

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.VACANT_REQUESTS)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.VACANT_REQUESTS]

    if (state) {
      this.viewMode = state.viewMode
      this.sortMode = state.sortMode
    }
  }

  onChangeViewMode(event, nextView) {
    this.viewMode = nextView
    this.setTableModeState()
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.requests).filter(el => el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()))
    } else {
      return toJS(this.requests)
    }
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  async loadData() {
    try {
      // await this.getRequestsVacant()
      this.getTableModeState()
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsVacant() {
    try {
      // const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.VACANT)
      // runInAction(() => {
      //   this.requests = result
      // })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickViewMore(id) {
    try {
      this.history.push(
        `/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/vacant-requests/custom-search-request`,
        { requestId: id },
      )
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerSortMode() {
    if (this.sortMode === tableSortMode.DESK) {
      this.sortMode = tableSortMode.ASC
    } else {
      this.sortMode = tableSortMode.DESK
    }

    this.setTableModeState()
  }
}
