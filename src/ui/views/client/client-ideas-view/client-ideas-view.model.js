import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { IdeaModel } from '@models/ideas-model'
import { SettingsModel } from '@models/settings-model'

import { clientIdeasColumns } from '@components/table/table-columns/client/client-ideas-columns'

// * Объект с доп. фильтра в зависимости от текущего роута

const additionalFiltersByUrl = {
  '/client/ideas/new': {
    statuses: [5],
    queries: {
      withOrder: false,
      withRequests: true,
    },
  },
  '/client/ideas/on-checking': {
    statuses: [10],
    queries: {
      withOrder: false,
      withRequests: true,
    },
  },
  '/client/ideas/search-suppliers': {
    statuses: [13, 14, 15],
    queries: {
      withOrder: false,
      withRequests: false,
    },
  },
  '/client/ideas/create-card': {
    statuses: [16],
    queries: {
      withOrder: false,
      withRequests: false,
    },
  },
  '/client/ideas/add-asin': {
    statuses: [18],
    queries: {
      withOrder: false,
      withRequests: false,
    },
  },
  '/client/ideas/realized': {
    statuses: [20],
    queries: {
      withOrder: true,
      withRequests: true,
    },
  },
  '/client/ideas/closed': {
    statuses: [25, 30],
    queries: {
      withOrder: false,
      withRequests: false,
    },
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

  // * Filtration

  currentSearchValue = ''
  filterModel = { items: [] }

  // * Pagination & Sort

  rowCount = 0
  sortModel = []
  densityModel = 'compact'
  paginationModel = { page: 0, pageSize: 15 }

  // * Table settings

  columnsModel = clientIdeasColumns()
  columnVisibilityModel = {}
  rowHandlers = {}
  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBatchesPagMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    // ...dataGridFiltersInitializer(filtersFields),
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.ideaList,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  // * Table settings saving

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

  // * Data getters

  async loadData() {
    this.getDataGridState()
    await this.getIdeaList()
  }

  async getIdeaList() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const additionalFilters = additionalFiltersByUrl[this.history.location.pathname]

      const response = await IdeaModel.getIdeaList({
        ...additionalFilters.queries,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        filters: `status[$eq]=${additionalFilters.statuses.join(',')}`,
      })

      runInAction(() => {
        this.ideaList = response.rows
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
}
