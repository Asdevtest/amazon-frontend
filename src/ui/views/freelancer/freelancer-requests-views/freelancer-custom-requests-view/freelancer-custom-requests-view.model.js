import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {RequestSubType, RequestType} from '@constants/request-type'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'

import {freelancerCustomSearchRequestsBtnsViewColumns} from '@components/table-columns/freelancer/freelancer-custom-search-requests-btns-columns'

import {freelancerCustomRequestsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class FreelancerСustomRequestsViewModel {
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

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = freelancerCustomSearchRequestsBtnsViewColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.FREELANCER_CUSTOM_SEARCH_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.FREELANCER_CUSTOM_SEARCH_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = freelancerCustomSearchRequestsBtnsViewColumns(this.rowHandlers).map(el => ({
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

      this.getCustomRequests()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickAddBtn() {
    this.requestFormSettings = {
      request: {},
      isEdit: false,
      onSubmit: data => this.onSubmitCreateCustomSearchRequest(data),
    }
    this.onTriggerOpenModal('showRequestForm')
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
        this.searchRequests = freelancerCustomRequestsDataConverter(result).sort(
          sortObjectsArrayByFiledDate('createdAt'),
        )
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
    this.history.push('/freelancer/custom-search-request', {request: toJS(item.originalData)})
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
