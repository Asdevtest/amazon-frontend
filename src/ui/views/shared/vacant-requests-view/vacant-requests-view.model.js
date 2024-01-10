import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestSubType } from '@constants/requests/request-type'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { GeneralModel } from '@models/general-model'
import { RequestModel } from '@models/request-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { FreelancerVacantRequestColumns } from '@components/table/table-columns/freelancer/freelancer-vacant-request-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { defaultHiddenColumns, filtersFields } from './vacant-requests-view.constants'

export class VacantRequestsViewModel {
  history = undefined
  requestStatus = undefined

  nameSearchValue = ''

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]
  showRequestDetailModal = false

  get currentData() {
    return this.requests
  }
  currentRequestDetails = undefined

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }

  pageSizeOptions = [15, 25, 50, 100]
  paginationModel = { page: 0, pageSize: 100 }
  columnVisibilityModel = {}

  searchMyRequestsIds = []
  requests = []
  openModal = null
  viewMode = tableViewMode.TABLE
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getRequestsVacant()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  handlers = {
    onClickViewMore: id => this.onClickViewMore(id),
    onClickOpenInNewTab: id => this.onClickOpenInNewTab(id),
  }

  columnsModel = FreelancerVacantRequestColumns(
    this.handlers,
    this.languageTag,
    () => this.columnMenuSettings,
    () => this.onHover,
  )

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setTableModeState() {
    const state = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.VACANT_REQUESTS)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.VACANT_REQUESTS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
    defaultHiddenColumns.forEach(el => {
      this.columnVisibilityModel[el] = false
    })
  }

  onChangeViewMode(value) {
    this.viewMode = value

    this.setTableModeState()
  }

  onClickTaskType(taskType) {
    this.selectedTaskType = taskType

    this.getRequestsVacant()
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.getTableModeState()
      await this.getRequestsVacant()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async getRequestsVacant() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await RequestModel.getRequests({
        kind: RequestSubType.VACANT,
        filters: this.getFilter(),
        typeTask:
          Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])
            ? undefined
            : this.selectedTaskType,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length
          ? this.sortModel[0].field === 'deadline'
            ? 'timeoutAt'
            : this.sortModel[0].field
          : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.requests = addIdDataConverter(result.rows)

        this.rowCount = result.count
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)

      runInAction(() => {
        this.requests = []
      })
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'title',
        'humanFriendlyId',
        'asin',
      ]),
    )
  }

  async onClickFilterBtn(column) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'requests'),
        column,
        `requests?kind=${RequestSubType.VACANT}&filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)

      console.log(error)
    }
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setTableModeState()
    this.getRequestsVacant()
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getRequestsVacant()
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,

      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getRequestsVacant()
  }

  onClickViewMore(id) {
    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.user?.role]}/freelance/vacant-requests/custom-search-request?request-id=${id}`,
      '_blank',
    )

    win.focus()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerSortMode() {
    if (this.sortMode === tableSortMode.DESK) {
      this.sortMode = tableSortMode.ASC
      this.sortModel[0] = {
        ...this.sortModel[0],
        sort: tableSortMode.ASC,
        field: 'updatedAt',
      }
    } else {
      this.sortMode = tableSortMode.DESK
      this.sortModel[0] = {
        ...this.sortModel[0],
        sort: tableSortMode.DESC,
        field: 'updatedAt',
      }
    }

    this.getRequestsVacant()
    this.setTableModeState()
  }

  onChangePaginationModelChange(model) {
    this.paginationModel = model

    this.getRequestsVacant()
    this.setTableModeState()
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setTableModeState()
    this.getRequestsVacant()
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getRequestDetail(id) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const response = await RequestModel.getCustomRequestById(id)

      runInAction(() => {
        this.currentRequestDetails = response
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  handleOpenRequestDetailModal(id) {
    if (window.getSelection().toString()) {
      return
    }

    this.getRequestDetail(id).then(() => {
      this.onTriggerOpenModal('showRequestDetailModal')
    })
  }

  onClickSuggest() {
    this.history.push(
      `/${
        UserRoleCodeMapForRoutes[this.user?.role]
      }/freelance/vacant-requests/custom-search-request/create-proposal?requestId=${
        this.currentRequestDetails.request._id
      }`,
    )
  }

  onClickOpenInNewTab(id) {
    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.user?.role]
      }/freelance/vacant-requests/custom-search-request?request-id=${id}`,
      '_blank',
    )

    win.focus()
  }
}
