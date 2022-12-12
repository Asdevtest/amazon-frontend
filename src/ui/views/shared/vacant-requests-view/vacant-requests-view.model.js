import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {RequestSubType, RequestType} from '@constants/request-type'
import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class VacantRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  nameSearchValue = ''

  drawerOpen = false

  searchMyRequestsIds = []
  requests = []
  openModal = null
  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setTableModeState() {
    const state = {viewMode: this.viewMode, sortMode: this.sortMode}

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.VACANT_REQUESTS)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.VACANT_REQUESTS]

    runInAction(() => {
      if (state) {
        this.viewMode = state.viewMode
        this.sortMode = state.sortMode
      }
    })
  }

  onChangeViewMode(event, nextView) {
    runInAction(() => {
      this.viewMode = nextView
    })
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
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  async loadData() {
    try {
      await this.getRequestsVacant()
      this.getTableModeState()
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsVacant() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.VACANT)

      runInAction(() => {
        this.requests = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickViewMore(id) {
    try {
      this.history.push(
        `/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/vacant-requests/custom-search-request`,
        {requestId: id},
      )
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onTriggerSortMode() {
    runInAction(() => {
      if (this.sortMode === tableSortMode.DESK) {
        this.sortMode = tableSortMode.ASC
      } else {
        this.sortMode = tableSortMode.DESK
      }
    })

    this.setTableModeState()
  }
}
