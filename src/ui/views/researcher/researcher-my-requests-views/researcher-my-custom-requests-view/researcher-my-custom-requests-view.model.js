import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {RequestSubType, RequestType} from '@constants/request-type'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'

import {researcherCustomSearchRequestsViewColumns} from '@components/table-columns/researcher/researcher-custom-search-requests-columns'

import {researcherCustomRequestsDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
  strategyStatus: '',
}

export class ResearcherMyCustomRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  formFields = {...formFieldsDefault}
  newProductId = undefined

  searchRequests = []
  tmpSelectedRow = {}

  showConfirmModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = researcherCustomSearchRequestsViewColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.RESEARCHER_CUSTOM_MY_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.RESEARCHER_CUSTOM_MY_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = researcherCustomSearchRequestsViewColumns().map(el => ({
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

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.searchRequests)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getMyCustomRequests()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getMyCustomRequests() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.ASSIGNEES)

      runInAction(() => {
        this.searchRequests = researcherCustomRequestsDataConverter(result)
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickTableRow(item) {
    this.tmpSelectedRow = item

    this.history.push('/researcher/custom-search-request', {request: toJS(this.tmpSelectedRow.originalData)})

    this.onTriggerOpenModal('showConfirmModal')
  }

  onChangeCurPage(e) {
    this.curPage = e
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
}
