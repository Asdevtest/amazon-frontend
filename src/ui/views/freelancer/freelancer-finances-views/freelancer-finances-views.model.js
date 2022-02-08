import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {ActiveSubCategoryTablesKeys} from '@constants/active-sub-category-tables-keys'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {FreelancerModel} from '@models/freelancer-model'
import {SettingsModel} from '@models/settings-model'

import {freelancerFinancesViewColumns} from '@components/table-columns/freelancer/freelancer-finances-columns/freelancer-finances-columns'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class FreelancerFinancesViewsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  currentFinancesData = []

  selectionModel = undefined

  activeSubCategory = SettingsModel.activeSubCategoryState[ActiveSubCategoryTablesKeys.FREELANCER_FINANCES] || 0
  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = freelancerFinancesViewColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.FREELANCER_FINANCES)
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.FREELANCER_FINANCES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.FREELANCER_FINANCES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = freelancerFinancesViewColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeSubCategory(value) {
    this.setActiveSubCategoryState(value)
    this.activeSubCategory = value
    this.getPayments(value)
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getPayments(activeSubCategory) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await FreelancerModel.getPaymentsMy()

      const paymentsData = result.map(item => ({
        ...item,
        id: item._id,
        tmpCreatorName: item.createdBy?.name,
        tmpRecipientName: item.recipient?.name,
      }))

      runInAction(() => {
        this.currentFinancesData = paymentsData
          .filter(el => (activeSubCategory < 1 ? el.sum >= 0 : el.sum < 0))
          .sort(sortObjectsArrayByFiledDate('createdAt'))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
      this.currentFinancesData = []
    }
  }

  getCurrentData() {
    return toJS(this.currentFinancesData)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onChangeCurPage(e) {
    this.curPage = e
  }
}
