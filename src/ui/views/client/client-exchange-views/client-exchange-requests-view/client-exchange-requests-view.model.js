import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'

import {ProductSearchRequestModel} from '@models/product-search-request-model'
import {SettingsModel} from '@models/settings-model'

import {clientSearchRequestsViewColumns} from '@components/table-columns/client/client-search-requests-columns'

import {formatDateForBackendWithoutParseISO, sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class ClientExchangeRequestsViewModel {
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

  requestFormSettings = {request: {}, isEdit: false, onSubmit: data => this.onSubmitCreateProductSearchRequest(data)}

  rowHandlers = {
    onClickRemoveBtn: id => this.onClickRemoveBtn(id),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = clientSearchRequestsViewColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.CLIENT_SEARCH_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_SEARCH_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientSearchRequestsViewColumns(this.rowHandlers).map(el => ({
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

      this.getProductSearchRequests()

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
      onSubmit: data => this.onSubmitCreateProductSearchRequest(data),
    }
    this.onTriggerOpenModal('showRequestForm')
  }

  onClickEditBtn(row) {
    this.requestFormSettings = {
      request: row,
      isEdit: true,
      onSubmit: (data, requestId) => this.onSubmitEditProductSearchRequest(data, requestId),
    }
    this.onTriggerOpenModal('showRequestForm')
  }

  async onSubmitEditProductSearchRequest(data, requestId) {
    try {
      await this.editProductSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getProductSearchRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitCreateProductSearchRequest(data) {
    try {
      await this.createProductSearchRequest(data)

      this.onTriggerOpenModal('showRequestForm')
      this.getProductSearchRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async editProductSearchRequest(data, requestId) {
    try {
      const newData = {
        ...data,
        deadline: data.deadline instanceof String ? data.deadline : formatDateForBackendWithoutParseISO(data.deadline),
      }
      await ProductSearchRequestModel.updateProductSearchRequest(requestId, newData)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createProductSearchRequest(data) {
    try {
      const newData = {...data, deadline: formatDateForBackendWithoutParseISO(data.deadline)}
      await ProductSearchRequestModel.createProductSearchRequest(newData)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickRemoveBtn(id) {
    this.researchIdToRemove = id

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeProductSearchRequest() {
    try {
      await ProductSearchRequestModel.removeProductSearchRequests(this.researchIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.getProductSearchRequests()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductSearchRequests() {
    try {
      const result = await ProductSearchRequestModel.getProductSearchRequests()

      runInAction(() => {
        this.searchRequests = result.sort(sortObjectsArrayByFiledDate('createdAt')).map(request => ({
          ...request,
          id: request._id,
          tmpStrategyStatus: mapProductStrategyStatusEnum[request.strategy],
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

    this.history.push('/client/request', {request: toJS(requestItem)})
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
