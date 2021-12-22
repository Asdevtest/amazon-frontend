import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'

import {clientNicheSearchRequestsViewColumns} from '@components/table-columns/client/client-niche-search-requests-columns/client-niche-search-requests-columns'

import {formatDateForBackendWithoutParseISO, sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class ClientRequestsNichesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  showRequestForm = false
  showConfirmModal = false

  modalCloseRequest = false

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined

  searchRequests = []

  requestFormSettings = {
    request: {},
    isEdit: false,
    onSubmit: data => this.onSubmitCreateNicheSearchRequest(data),
  }

  rowHandlers = {
    onClickRemoveBtn: id => this.onClickRemoveBtn(id),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = clientNicheSearchRequestsViewColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.CLIENT_NICHE_SEARCH_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_NICHE_SEARCH_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientNicheSearchRequestsViewColumns(this.rowHandlers).map(el => ({
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

      this.getNicheSearchRequests()

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
      onSubmit: data => this.onSubmitCreateNicheSearchRequest(data),
    }
    this.onTriggerOpenModal('showRequestForm')
  }

  onClickEditBtn(row) {
    this.requestFormSettings = {
      request: row,
      isEdit: true,
      onSubmit: (data, requestId) => this.onSubmitEditNicheSearchRequest(data, requestId),
    }
    this.onTriggerOpenModal('showRequestForm')
  }

  async onSubmitEditNicheSearchRequest(data, requestId) {
    try {
      await this.editNicheSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getNicheSearchRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitCreateNicheSearchRequest(data) {
    try {
      await this.createNicheSearchRequest(data)

      this.onTriggerOpenModal('showRequestForm')
      this.getNicheSearchRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async editNicheSearchRequest(data, requestId) {
    try {
      const newData = {
        ...data,
        deadline: data.deadline instanceof String ? data.deadline : formatDateForBackendWithoutParseISO(data.deadline),
      }
      await RequestModel.updateNicheSearchRequest(requestId, newData)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createNicheSearchRequest(data) {
    try {
      const newData = {...data, deadline: formatDateForBackendWithoutParseISO(data.deadline)}
      await RequestModel.createNicheSearchRequest(newData)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickRemoveBtn(id) {
    this.researchIdToRemove = id

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeNicheSearchRequest() {
    try {
      await RequestModel.removeNicheSearchRequests(this.researchIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.getNicheSearchRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getNicheSearchRequests() {
    try {
      const result = await RequestModel.getNicheSearchRequests()

      runInAction(() => {
        this.searchRequests = result.sort(sortObjectsArrayByFiledDate('createdAt')).map(request => ({
          ...request,
          id: request._id,
        }))
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
    const requestItem = getObjectFilteredByKeyArrayBlackList(
      {
        ...item,
      },
      ['tmpStrategyStatus'],
    )

    this.history.push('/client/niche-search-request', {request: toJS(requestItem)})
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
