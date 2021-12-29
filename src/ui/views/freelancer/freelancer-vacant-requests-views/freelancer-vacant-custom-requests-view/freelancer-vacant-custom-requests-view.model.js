import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {RequestSubType, RequestType} from '@constants/request-type'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'

import {freelancerCustomSearchRequestsViewColumns} from '@components/table-columns/freelancer/freelancer-custom-search-requests-columns'

import {freelancerCustomRequestsDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
  strategyStatus: '',
}

export class FreelancerVacantCustomRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  formFields = {...formFieldsDefault}
  newProductId = undefined

  searchMyRequestsIds = []
  searchRequests = []
  tmpSelectedRow = {}

  showConfirmModal = false
  showWarningModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = freelancerCustomSearchRequestsViewColumns()

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.FREELANCER_CUSTOM_VACANT_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.FREELANCER_CUSTOM_VACANT_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = freelancerCustomSearchRequestsViewColumns().map(el => ({
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
      await this.getRequestsVacant()

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
        this.searchMyRequestsIds = result.map(item => item.request._id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsVacant() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.VACANT)

      runInAction(() => {
        this.searchRequests = freelancerCustomRequestsDataConverter(
          result.filter(item => !this.searchMyRequestsIds.includes(item.request._id)),
        )
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickTableRow(item) {
    this.tmpSelectedRow = item.originalData

    this.onTriggerOpenModal('showConfirmModal')
  }

  pushToRequestContent() {
    this.onTriggerOpenModal('showConfirmModal')

    this.pickupRequestById(this.tmpSelectedRow.request._id)
  }

  async pickupRequestById(id) {
    try {
      await RequestModel.pickupRequestById(id)

      this.history.push('/freelancer/custom-search-request', {request: toJS(this.tmpSelectedRow)})
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
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
