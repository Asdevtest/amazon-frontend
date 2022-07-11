import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'

// import {UserModel} from '@models/user-model'
import {vacByUserIdExchangeColumns} from '@components/table-columns/product/vac-by-user-id-exchange-columns'

import {clientProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AnotherProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined

  user = undefined

  drawerOpen = false

  rowsPerPage = 15
  curPage = 1
  productList = []

  productsVacant = []

  tabExchange = 0
  tabHistory = 0
  tabReview = 0
  selectedUser = undefined
  showTabModal = false
  showInfoModal = false

  headerInfoData = {
    investorsCount: 255,
    goodsFound: 875,
    transactionsVolume: 7555,
    earnedAmount: 1255,
    addInSave: 12,
    inBlocked: 12,
    youBlocked: 14,
    accountCreateAt: 11,
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = vacByUserIdExchangeColumns()

  constructor({history}) {
    this.history = history

    this.userId = history.location.search.slice(1)

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

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.PROFILE_VAC_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.PROFILE_VAC_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = vacByUserIdExchangeColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
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
    return toJS(this.productsVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUserById()
      this.getDataGridState()
      await this.getProductsVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsVacant() {
    try {
      const result = await ProductModel.getVacProductByUserId(this.userId)

      runInAction(() => {
        this.productsVacant = clientProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
      this.productsVacant = []
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getUserById() {
    try {
      const result = await AdministratorModel.getUsersById(this.userId)

      // const result = await UserModel.getUserInfoById(this.userId)

      runInAction(() => {
        this.user = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  // async loadData() {
  //   try {
  //     this.setRequestStatus(loadingStatuses.isLoading)

  //     await this.getUserById()

  //     this.setRequestStatus(loadingStatuses.success)
  //   } catch (error) {
  //     this.setRequestStatus(loadingStatuses.failed)
  //     console.log(error)
  //   }
  // }

  onChangeTabReview(e, value) {
    this.tabReview = value
  }

  onChangeTabHistory(e, value) {
    this.tabHistory = value
  }

  onChangeTabExchange(e, value) {
    this.tabExchange = value
  }

  onTriggerDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
