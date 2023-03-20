import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {freelanceRequestType, freelanceRequestTypeByKey} from '@constants/freelance-request-type'
import {RequestSubType, RequestType} from '@constants/request-type'
import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {FreelancerVacantRequestColumns} from '@views/freelancer/freelancer-vacant-request-columns/freelancer-vacant-request-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'

export class VacantRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  nameSearchValue = ''

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  drawerOpen = false

  currentData = []

  rowCount = 0
  curPage = 0
  sortModel = []
  filterModel = {items: []}
  rowsPerPage = 15
  columnVisibilityModel = undefined

  searchMyRequestsIds = []
  requests = []
  openModal = null
  viewMode = tableViewMode.TABLE
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag || {}
  }

  handlers = {onClickViewMore: id => this.onClickViewMore(id)}

  columnsModel = FreelancerVacantRequestColumns(this.handlers, this.languageTag)

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => this.requests,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  getDataGridState() {
    runInAction(() => {
      this.columnsModel = FreelancerVacantRequestColumns(this.handlers, this.languageTag)
    })
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

  onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })
    this.getRequestsVacant()
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
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.VACANT, {
        typeTask: this.selectedTaskType,
      })

      runInAction(() => {
        this.requests = addIdDataConverter(result)
        this.rowCount = result.length
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.requests = []
      })
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

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
    this.getRequestsVacant()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getRequestsVacant()
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
    })

    this.getRequestsVacant()
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }
}
