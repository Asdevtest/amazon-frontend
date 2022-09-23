import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {SettingsModel} from '@models/settings-model'
import {SupervisorModel} from '@models/supervisor-model'

import {supervisorProductsViewColumns} from '@components/table-columns/supervisor/supervisor-products-columns'

import {supervisorProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {resetDataGridFilter} from '@utils/filters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  baseNoConvertedProducts = []
  productsMy = []

  sortModel = []
  startFilterModel = undefined
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = supervisorProductsViewColumns()
  showAsinCheckerModal = false

  constructor({history, location}) {
    this.history = history

    if (location?.state?.dataGridFilter) {
      this.startFilterModel = location.state.dataGridFilter
    } else {
      this.startFilterModel = resetDataGridFilter
    }

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      this.productsMy = supervisorProductsDataConverter(
        this.baseNoConvertedProducts.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
      )
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUPERVISOR_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = this.startFilterModel
        ? {
            ...this.startFilterModel,
            items: this.startFilterModel.items.map(el => ({...el, value: el.value.map(e => t(e))})),
          }
        : state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = supervisorProductsViewColumns().map(el => ({
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
    return toJS(this.productsMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getProductsMy()
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
        this.baseNoConvertedProducts = result

        this.productsMy = supervisorProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickTableRow(item) {
    this.history.push({
      pathname: '/supervisor/products/product',
      search: item.originalData._id,
    })
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }
  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
