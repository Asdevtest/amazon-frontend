import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
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
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { RequestSubType } from '@constants/requests/request-type'

const filtersFields = [
  'humanFriendlyId',
  'updatedAt',
  'status',
  'title',
  'typeTask',
  'price',
  'timeoutAt',
  'asin',
  'skusByClient',
  'amazonTitle',
  'createdBy',
  'subUsers',
  'priceAmazon',
  'withoutConfirmation',
]

export class VacantRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  nameSearchValue = ''

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  currentData = []

  userInfo = []
  userRole = undefined

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }

  paginationModel = { page: 0, pageSize: 15 }
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
    return SettingsModel.languageTag || {}
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: withoutUpdate => {
      this.onLeaveColumnField()

      if (withoutUpdate) {
        this.getCurrentData()
      } else {
        this.getRequestsVacant()
        // this.getDataGridState()
      }
    },

    filterRequestStatus: undefined,

    ...filtersFields.reduce(
      (ac, cur) =>
        (ac = {
          ...ac,
          [cur]: {
            filterData: [],
            currentFilterData: [],
          },
        }),
      {},
    ),
  }

  handlers = { onClickViewMore: id => this.onClickViewMore(id) }

  columnsModel = FreelancerVacantRequestColumns(
    this.handlers,
    this.languageTag,
    () => this.columnMenuSettings,
    () => this.onHover,
  )

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.requests,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )

    reaction(
      () => this.nameSearchValue,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.VACANT_REQUESTS)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.VACANT_REQUESTS]

    runInAction(() => {
      if (state) {
        this.viewMode = state.viewMode
        this.sortMode = state.sortMode
      }
    })
  }

  onChangeViewMode(event, nextView) {
    runInAction(() => {
      this.viewMode = nextView
    })
    this.setTableModeState()
  }

  getCurrentData() {
    return toJS(this.requests)
  }

  onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })
    this.getRequestsVacant()
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  async getUserInfo() {
    const result = await UserModel.userInfo
    this.userInfo = result
    this.userRole = UserRoleCodeMap[result.role]
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUserInfo()

      await Promise.all([this.getRequestsVacant(), this.getTableModeState()])

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getRequestsVacant() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await RequestModel.getRequests(RequestSubType.VACANT, {
        filters: this.getFilter(),
        typeTask:
          Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])
            ? undefined
            : this.selectedTaskType,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.requests = addIdDataConverter(result.rows)

        this.rowCount = result.count
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)

      runInAction(() => {
        this.requests = []
      })
    }
  }

  getFilter(exclusion) {
    const humanFriendlyIdFilter =
      exclusion !== 'humanFriendlyId' && this.columnMenuSettings.humanFriendlyId.currentFilterData.join(',')
    const updatedAtFilter = exclusion !== 'updatedAt' && this.columnMenuSettings.updatedAt.currentFilterData.join(',')
    const statusFilter = exclusion !== 'status' && this.columnMenuSettings.status.currentFilterData.join(',')
    const titleFilter = exclusion !== 'title' && this.columnMenuSettings.title.currentFilterData.join(',')
    const typeTaskFilter = exclusion !== 'typeTask' && this.columnMenuSettings.typeTask.currentFilterData.join(',')
    const asinFilter = exclusion !== 'asin' && this.columnMenuSettings.asin.currentFilterData.join(',')
    const priceFilter = exclusion !== 'price' && this.columnMenuSettings.price.currentFilterData.join(',')
    const timeoutAtFilter = exclusion !== 'timeoutAt' && this.columnMenuSettings.timeoutAt.currentFilterData.join(',')
    const subUsersFilter =
      exclusion !== 'subUsers' && this.columnMenuSettings?.subUsers?.currentFilterData?.map(item => item._id)?.join(',')

    const skusByClientFilter =
      exclusion !== 'skusByClient' &&
      this.columnMenuSettings.skusByClient.currentFilterData /* .map(el => `"${el}"`) */
        .join(',')
    const amazonTitleFilter =
      exclusion !== 'amazonTitle' &&
      this.columnMenuSettings.amazonTitle.currentFilterData.map(el => `"${el}"`).join(',')

    const createdByFilter = exclusion !== 'createdBy' && this.columnMenuSettings.createdBy.currentFilterData.join(',')

    const priceAmazonFilter =
      exclusion !== 'priceAmazon' && this.columnMenuSettings.priceAmazon.currentFilterData.join(',')

    const withoutConfirmationFilter =
      exclusion !== 'withoutConfirmation' && this.columnMenuSettings.withoutConfirmation.currentFilterData.join(',')

    const filter = objectToUrlQs({
      or: [
        { asin: { $contains: this.nameSearchValue } },
        { title: { $contains: this.nameSearchValue } },
        { humanFriendlyId: { $eq: this.nameSearchValue } },
      ].filter(
        el =>
          ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) &&
            !el.id &&
            !el.humanFriendlyId) ||
          !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
      ),

      ...(asinFilter && {
        asin: { $eq: asinFilter },
      }),
      ...(skusByClientFilter && {
        skusByClient: { $eq: skusByClientFilter },
      }),
      ...(amazonTitleFilter && {
        amazonTitle: { $eq: amazonTitleFilter },
      }),

      ...(humanFriendlyIdFilter && {
        humanFriendlyId: { $eq: humanFriendlyIdFilter },
      }),
      ...(updatedAtFilter && {
        updatedAt: { $eq: updatedAtFilter },
      }),
      ...(statusFilter && {
        status: { $eq: statusFilter },
      }),
      ...(titleFilter && {
        title: { $contains: titleFilter },
      }),
      ...(typeTaskFilter && {
        typeTask: { $eq: typeTaskFilter },
      }),
      ...(priceFilter && {
        price: { $eq: priceFilter },
      }),
      ...(timeoutAtFilter && {
        timeoutAt: { $eq: timeoutAtFilter },
      }),
      ...(createdByFilter && {
        createdBy: { $eq: createdByFilter },
      }),
      ...(subUsersFilter && {
        subUsers: { $eq: subUsersFilter },
      }),
      ...(priceAmazonFilter && {
        priceAmazon: { $eq: priceAmazonFilter },
      }),
      ...(withoutConfirmationFilter && {
        withoutConfirmation: { $eq: withoutConfirmationFilter },
      }),
    })

    return filter
  }

  async onClickFilterBtn(column) {
    try {
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'requests'),
        column,
        `requests?kind=${RequestSubType.VACANT}&filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      // this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getRequestsVacant()
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,

        ...filtersFields.reduce(
          (ac, cur) =>
            (ac = {
              ...ac,
              [cur]: {
                filterData: [],
                currentFilterData: [],
              },
            }),
          {},
        ),
      }
    })

    this.getRequestsVacant()
  }

  async onClickViewMore(id) {
    try {
      this.history.push(
        `/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/vacant-requests/custom-search-request?request-id=${id}`,
      )
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onTriggerSortMode() {
    runInAction(() => {
      if (this.sortMode === tableSortMode.DESK) {
        this.sortMode = tableSortMode.ASC
      } else {
        this.sortMode = tableSortMode.DESK
      }
    })

    this.setTableModeState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.getRequestsVacant()
    this.setTableModeState()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
