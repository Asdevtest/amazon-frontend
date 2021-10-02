import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatusByCode} from '@constants/product-status'

import {SettingsModel} from '@models/settings-model'
import {SupervisorModel} from '@models/supervisor-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  productsMy = []

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.SUPERVISOR_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
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
    return toJS(this.productsMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsMy() {
    try {
      const result = await SupervisorModel.getProductsMy()

      runInAction(() => {
        this.productsMy = result.sort(sortObjectsArrayByFiledDate('createdAt')).map(item => ({
          ...item,
          tmpStatus: ProductStatusByCode[item.status],
          tmpResearcherName: item.createdBy.name,
          tmpBuyerName: item.buyer ? item.buyer.name : '',
        }))
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickTableRow(item) {
    const requestItem = getObjectFilteredByKeyArrayBlackList(
      {
        ...item,
      },
      ['tmpStatus', 'tmpResearcherName', 'tmpBuyerName'],
    )

    this.history.push('/supervisor/product', {product: toJS(requestItem)})
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }
}
