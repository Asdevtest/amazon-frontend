import {makeAutoObservable, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {SettingsModel} from '@models/settings-model'

import {
  researcherProductsRequestsViewColumns,
  typeOfRequests,
} from '@components/table-columns/researcher/researcher-products-requests-columns'

import {getObjectFilteredByKeyArrayWhiteList, getObjectFilteredByKeyArrayBlackList} from '@utils/object'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
  strategyStatus: '',
}

export class ResearcherVacantProductsRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  formFields = {...formFieldsDefault}
  newProductId = undefined

  requests = []
  tmpSelectedRow = {}

  showConfirmModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = researcherProductsRequestsViewColumns(typeOfRequests.PRODUCT)

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.RESEARCHER_PRODUCT_VACANT_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.RESEARCHER_PRODUCT_VACANT_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = researcherProductsRequestsViewColumns(typeOfRequests.PRODUCT).map(el => ({
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
    return toJS(this.requests)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickTableRow(item) {
    this.tmpSelectedRow = item

    this.onTriggerOpenModal('showConfirmModal')
  }

  pushToRequestContent() {
    this.onTriggerOpenModal('showConfirmModal')

    const requestItem = getObjectFilteredByKeyArrayBlackList(
      {
        ...this.tmpSelectedRow,
      },
      ['tmpStrategyStatus', 'tmpCostOfOneProposal'],
    )

    this.history.push('/researcher/product-search-request', {request: toJS(requestItem)})
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
