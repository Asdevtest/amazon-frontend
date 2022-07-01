import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {RequestSubType, RequestType} from '@constants/request-type'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {myRequestsViewColumns} from '@components/table-columns/overall/my-requests-columns'

import {myRequestsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class MyRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  showRequestForm = false
  showConfirmModal = false

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined

  searchRequests = []

  requestFormSettings = {
    request: {},
    isEdit: false,
    onSubmit: data => this.onSubmitCreateCustomSearchRequest(data),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = myRequestsViewColumns(this.rowHandlers)

  get userInfo() {
    return UserModel.userInfo || {}
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

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

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.OVERALL_CUSTOM_SEARCH_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.OVERALL_CUSTOM_SEARCH_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = myRequestsViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  getCurrentData() {
    return toJS(this.searchRequests)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getCustomRequests()
      this.getDataGridState()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickAddBtn() {
    this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/create-request`)
  }

  onClickEditBtn(row) {
    this.requestFormSettings = {
      request: row,
      isEdit: true,
      onSubmit: (data, requestId) => this.onSubmitEditCustomSearchRequest(data, requestId),
    }
    this.onTriggerOpenModal('showRequestForm')
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitCreateCustomSearchRequest(data) {
    try {
      await this.createCustomSearchRequest(data)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async editCustomSearchRequest(data, requestId) {
    try {
      await RequestModel.updateCustomRequest(requestId, data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createCustomSearchRequest(data) {
    try {
      await RequestModel.createCustomSearchRequest(data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickRemoveBtn(row) {
    this.researchIdToRemove = row.request._id

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeCustomSearchRequest() {
    try {
      await RequestModel.removeCustomRequests(this.researchIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getCustomRequests() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.MY)

      runInAction(() => {
        this.searchRequests = myRequestsDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onSelectRequest(index) {
    const newSelectedRequests = [...this.selectedRequests]
    const findRequestIndex = this.selectedRequests.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedRequests.splice(findRequestIndex, 1)
    } else {
      newSelectedRequests.push(index)
    }
    this.selectedRequests = newSelectedRequests
  }

  onClickTableRow(item) {
    this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/custom-request`, {
      request: toJS(item),
    })
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
