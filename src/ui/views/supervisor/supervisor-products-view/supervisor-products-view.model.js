import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {SettingsModel} from '@models/settings-model'
import {SupervisorModel} from '@models/supervisor-model'

import {supervisorProductsViewColumns} from '@components/table-columns/supervisor/supervisor-products-columns'

import {supervisorProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  nameSearchValue = ''

  currentFilterStatus = ProductStatusByKey[ProductStatus.DEFAULT]

  currentData = []

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
    runInAction(() => {
      this.history = history

      if (location?.state?.dataGridFilter) {
        this.startFilterModel = location.state.dataGridFilter
      }
    })

    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.productsMy,
      () => {
        this.currentData = this.getCurrentData()
      },
    )

    reaction(
      () => this.nameSearchValue,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = supervisorProductsViewColumns().map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      runInAction(() => {
        this.productsMy = supervisorProductsDataConverter(
          this.baseNoConvertedProducts.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
        )
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
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

    runInAction(() => {
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
    })
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
  }

  onClickStatusFilterButton(status) {
    runInAction(() => {
      this.currentFilterStatus = status

      if (Number(status) === Number(ProductStatusByKey[ProductStatus.DEFAULT])) {
        runInAction(() => {
          this.productsMy = supervisorProductsDataConverter(this.baseNoConvertedProducts).sort(
            sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
          )
        })
      } else {
        runInAction(() => {
          this.productsMy = supervisorProductsDataConverter(this.baseNoConvertedProducts)
            .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
            .filter(product => Number(product.status) === Number(this.currentFilterStatus))
        })
      }
    })
  }

  getProductsCountByStatus(status) {
    return supervisorProductsDataConverter(this.baseNoConvertedProducts).filter(
      product => Number(product.status) === Number(status),
    )
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectionModel = model
    })
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(
        this.productsMy.filter(
          el =>
            el.originalData.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            el.originalData.skusByClient?.some(sku => sku.toLowerCase().includes(this.nameSearchValue.toLowerCase())) ||
            el.originalData.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
        ),
      )
    } else {
      return toJS(this.productsMy)
    }
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
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  onClickTableRow(row) {
    const win = window.open(
      `${window.location.origin}/supervisor/products/product?product-id=${row.originalData._id}`,
      '_blank',
    )

    win.focus()
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
