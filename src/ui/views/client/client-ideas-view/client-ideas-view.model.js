import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { IdeaModel } from '@models/ideas-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'

import {
  clientAddAsinIdeasColumns,
  clientClosedIdeasColumns,
  clientCreateCardIdeasColumns,
  clientNewIdeasColumns,
  clientOnCheckingIdeasColumns,
  clientRealizedIdeasColumns,
  clientSearchSuppliersIdeasColumns,
} from '@components/table/table-columns/client/client-ideas-columns'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'
import { ProductModel } from '@models/product-model'

// * Объект с доп. фильтра в зависимости от текущего роута

const settingsByUrl = {
  '/client/ideas/new': {
    statuses: [5],
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientNewIdeasColumns,
  },
  '/client/ideas/on-checking': {
    statuses: [10],
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientOnCheckingIdeasColumns,
  },
  '/client/ideas/search-suppliers': {
    statuses: [13, 14, 15],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientSearchSuppliersIdeasColumns,
  },
  '/client/ideas/create-card': {
    statuses: [16],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientCreateCardIdeasColumns,
  },
  '/client/ideas/add-asin': {
    statuses: [18],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientAddAsinIdeasColumns,
  },
  '/client/ideas/realized': {
    statuses: [20],
    queries: {
      withOrder: true,
      withRequests: true,
    },
    columnsModel: clientRealizedIdeasColumns,
  },
  '/client/ideas/closed': {
    statuses: [25, 30],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientClosedIdeasColumns,
  },
  '/client/ideas/all': {
    statuses: [5, 10, 13, 14, 15, 16, 18, 20, 25, 30],
    queries: {
      withOrder: true,
      withRequests: true,
    },
  },
}

// * Список полей для фильтраций

const filtersFields = []

export class ClientIdeasViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  // * Data

  ideaList = []
  currentData = []
  shopList = []
  currentSettings = undefined

  // * Filtration

  currentSearchValue = ''
  filterModel = { items: [] }

  // * Pagination & Sort

  rowCount = 0
  sortModel = []
  densityModel = 'compact'
  paginationModel = { page: 0, pageSize: 15 }

  // * Modal data

  currentProduct = undefined

  // * Modal states

  showIdeaModal = false

  // * Table settings

  columnVisibilityModel = {}
  rowHandlers = {
    onClickToCheck: id => console.log(id),
    onClickReject: id => console.log(id),
    onClickCreateRequest: id => console.log(id),
    onClickLinkRequest: id => console.log(id),
    onClickCreateCard: id => console.log(id),
    onClickSelectSupplier: id => console.log(id),
    onClickClose: idea => console.log(idea),
    onClickRestore: idea => console.log(idea),
    onClickAccept: idea => console.log(idea),
    onClickParseProductData: idea => console.log(idea),

    barCodeHandlers: {
      onClickBarcode: product => console.log(product),
      onDoubleClickBarcode: product => console.log(product),
      onDeleteBarcode: product => console.log(product),
    },
  }
  columnsModel = clientNewIdeasColumns(this.rowHandlers, this.shopList)
  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBatchesPagMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
      this.currentSettings = settingsByUrl[history.location.pathname]
      this.handleUpdateColumnModel()
    })

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.ideaList,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
    reaction(
      () => this.shopList,
      () => {
        this.handleUpdateColumnModel()
      },
    )
  }

  // * Table settings handlers

  handleUpdateColumnModel() {
    this.columnsModel = this.currentSettings.columnsModel(this.rowHandlers, this.shopList)
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_IDEAS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_IDEAS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  // * Filtration handlers

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
    this.setDataGridState()
    this.getIdeaList()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getIdeaList()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getIdeaList()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.getIdeaList()
  }

  onChangeSearchValue(value) {
    this.currentSearchValue = value
    this.getIdeaList()
  }

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.currentSearchValue,
        exclusion,
        filtersFields,
        ['asin', 'sku', 'title'],
        {
          status: {
            $eq: this.currentSettings.statuses.join(','),
          },
        },
      ),
    )
  }

  // * Data getters

  async loadData() {
    this.getDataGridState()
    await this.getIdeaList()
    await this.getShopList()
  }

  async getIdeaList() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const response = await IdeaModel.getIdeaList({
        ...this.currentSettings.queries,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        filters: this.getFilters(),
      })

      runInAction(() => {
        this.ideaList = response.rows || []
        this.rowCount = response.count
      })

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log(error)
      this.error = error

      this.requestStatus = loadingStatuses.failed
    }
  }

  getCurrentData() {
    return toJS(this.ideaList)
  }

  async getShopList() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const response = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopList = response
      })

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log(error)
      this.error = error

      this.requestStatus = loadingStatuses.failed
    }
  }

  async getDataForIdeaModal(row) {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const result = await ProductModel.getProductById(row?.parentProduct?._id)

      console.log('row', row)
      console.log('result', result)
      runInAction(() => {
        this.currentProduct = result
        this.currentIdeaId = row._id
      })

      this.onTriggerOpenModal('showIdeaModal')

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log('error', error)
      this.requestStatus = loadingStatuses.failed
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
