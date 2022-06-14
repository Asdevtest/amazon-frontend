import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'

import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'

import {researcherProductsRequestsViewColumns} from '@components/table-columns/researcher/researcher-products-requests-columns'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList, getObjectFilteredByKeyArrayBlackList} from '@utils/object'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
  strategyStatus: '',
}

export class ResearcherProductsRequestsViewModel {
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
  columnsModel = researcherProductsRequestsViewColumns()

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
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.RESEARCHER_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.RESEARCHER_REQUESTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = researcherProductsRequestsViewColumns().map(el => ({
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
      this.getDataGridState()
      await this.getRequestsVacant()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getRequestsVacant() {
    try {
      const result = await RequestModel.getProductSearchRequestsForResearcher()
      runInAction(() => {
        this.requests = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')).map(item => ({
          ...item,
          id: item._id,
          tmpStrategyStatus: mapProductStrategyStatusEnum[item.strategy],
          tmpCostOfOneProposal: item.budget / item.countOfProposals,
        }))
      })
    } catch (error) {
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

    this.history.push('/researcher/request', {request: toJS(requestItem)})
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
