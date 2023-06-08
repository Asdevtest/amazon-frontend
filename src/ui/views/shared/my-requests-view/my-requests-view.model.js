import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestStatus } from '@constants/requests/request-status'
import { RequestSubType } from '@constants/requests/request-type'
import { freelanceRequestTypeByCode } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { RequestModel } from '@models/request-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { myRequestsViewColumns } from '@components/table/table-columns/overall/my-requests-columns'

import { myRequestsDataConverter } from '@utils/data-grid-data-converters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { GeneralModel } from '@models/general-model'

const allowStatuses = [RequestStatus.DRAFT, RequestStatus.PUBLISHED, RequestStatus.IN_PROCESS]

// const filtersFields = ['status', 'typeTask']

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
  'sub',
  'subUsers',
  'priority',
]

export class MyRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  showRequestForm = false
  showConfirmModal = false

  showAcceptMessage = undefined
  acceptMessage = undefined

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined

  nameSearchValue = ''
  onHover = null

  currentData = []

  rowsCount = 0

  searchRequests = []
  openModal = null
  requestFormSettings = {
    request: {},
    isEdit: false,
    onSubmit: data => this.onSubmitCreateCustomSearchRequest(data),
  }

  get userInfo() {
    return UserModel.userInfo || {}
  }

  get languageTag() {
    return SettingsModel.languageTag || {}
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  sortModel = []

  isRequestsAtWork = true

  filterModel = { items: [] }
  densityModel = 'compact'

  columnsModel = myRequestsViewColumns(
    () => this.columnMenuSettings,
    () => this.onHover,
  )

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: withoutUpdate => {
      this.onLeaveColumnField()

      if (withoutUpdate) {
        this.getCurrentData()
      } else {
        this.getCustomRequests()
        this.getDataGridState()
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

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location?.state) {
        this.acceptMessage = location?.state?.acceptMessage
        this.showAcceptMessage = location?.state?.showAcceptMessage

        const state = { ...history?.location?.state }
        delete state?.acceptMessage
        delete state?.showAcceptMessage
        history.replace({ ...history?.location, state })
      }

      if (this.isRequestsAtWork) {
        this.onChangeFullFieldMenuItem(allowStatuses, 'status')
      } else {
        this.onChangeFullFieldMenuItem(
          Object.values(RequestStatus).filter(el => !allowStatuses.includes(el)),
          'status',
        )
      }
    })

    makeAutoObservable(this, undefined, { autoBind: true })

    runInAction(() => {
      if (this.showAcceptMessage) {
        setTimeout(() => {
          this.acceptMessage = ''
          this.showAcceptMessage = false
        }, 3000)
      }
    })

    reaction(
      () => this.isRequestsAtWork,
      () => {
        if (this.isRequestsAtWork) {
          this.onChangeFullFieldMenuItem(allowStatuses, 'status')
        } else {
          this.onChangeFullFieldMenuItem(
            Object.values(RequestStatus).filter(el => !allowStatuses.includes(el)),
            'status',
          )
        }
      },
    )

    reaction(
      () => this.isRequestsAtWork,
      () => {
        this.currentData = this.getCustomRequests()
      },
    )

    reaction(
      () => this.searchRequests,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getCustomRequests()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  onClickChangeCatigory(value) {
    runInAction(() => {
      // console.log('value', value)
      this.isRequestsAtWork = value
    })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.OVERALL_CUSTOM_SEARCH_REQUESTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.OVERALL_CUSTOM_SEARCH_REQUESTS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()

    this.requestStatus = loadingStatuses.isLoading
    this.getCustomRequests().then(() => {
      this.requestStatus = loadingStatuses.success
    })
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.searchRequests)
        .filter(
          el =>
            el?.title?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            el?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            el?.humanFriendlyId?.toString().toLowerCase().includes(this.nameSearchValue.toLowerCase()),
        )
        .filter(el =>
          this.columnMenuSettings.status.currentFilterData.length
            ? this.columnMenuSettings.status.currentFilterData.includes(el.status)
            : el,
        )
        .filter(el =>
          this.columnMenuSettings.typeTask.currentFilterData.length
            ? this.columnMenuSettings.typeTask.currentFilterData.includes(freelanceRequestTypeByCode[el.typeTask])
            : el,
        )
    } else {
      return toJS(this.searchRequests)
        .filter(el =>
          this.columnMenuSettings.status.currentFilterData.length
            ? this.columnMenuSettings.status.currentFilterData.includes(el.status)
            : el,
        )
        .filter(el =>
          this.columnMenuSettings.typeTask.currentFilterData.length
            ? this.columnMenuSettings.typeTask.currentFilterData.includes(freelanceRequestTypeByCode[el.typeTask])
            : el,
        )
    }
  }

  onHoverColumnField(field) {
    this.onHover = field
  }

  onLeaveColumnField() {
    this.onHover = null
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

    this.getCustomRequests()
    this.getDataGridState()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getCustomRequests()

      this.getDataGridState()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickAddBtn() {
    this.history.push(`/client/freelance/my-requests/create-request`)
  }

  onClickEditBtn(row) {
    runInAction(() => {
      this.requestFormSettings = {
        request: row,
        isEdit: true,
        onSubmit: (data, requestId) => this.onSubmitEditCustomSearchRequest(data, requestId),
      }
    })
    this.onTriggerOpenModal('showRequestForm')
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitCreateCustomSearchRequest(data) {
    try {
      await this.createCustomSearchRequest(data)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async editCustomSearchRequest(data, requestId) {
    try {
      await RequestModel.updateCustomRequest(requestId, data)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getCustomRequests()
  }

  async createCustomSearchRequest(data) {
    try {
      await RequestModel.createCustomSearchRequest(data)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickRemoveBtn(row) {
    runInAction(() => {
      this.researchIdToRemove = row.request._id
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeCustomSearchRequest() {
    try {
      await RequestModel.removeCustomRequests(this.researchIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.getCustomRequests()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  // async getCustomRequests() {
  //   try {
  //     const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.MY)
  //
  //     const filteredResult = result.filter(request => {
  //       if (this.isRequestsAtWork) {
  //         return allowStatuses.some(status => request.status === status)
  //       } else {
  //         return allowStatuses.every(status => request.status !== status)
  //       }
  //     })
  //
  //     runInAction(() => {
  //       this.searchRequests = myRequestsDataConverter(filteredResult).sort(
  //         sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
  //       )
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     runInAction(() => {
  //       this.error = error
  //     })
  //   }
  // }

  async getCustomRequests() {
    try {
      const result = await RequestModel.getRequests(RequestSubType.MY, {
        filters: this.getFilter() /* this.nameSearchValue ? filter : null */,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.searchRequests = myRequestsDataConverter(result.rows)
        this.rowCount = result.count
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
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
    const subFilter = exclusion !== 'sub' && this.columnMenuSettings.sub.currentFilterData.join(',')

    const skusByClientFilter =
      exclusion !== 'skusByClient' &&
      this.columnMenuSettings.skusByClient.currentFilterData /* .map(el => `"${el}"`) */
        .join(',')
    const amazonTitleFilter =
      exclusion !== 'amazonTitle' &&
      this.columnMenuSettings.amazonTitle.currentFilterData.map(el => `"${el}"`).join(',')

    const createdByFilter = exclusion !== 'createdBy' && this.columnMenuSettings.createdBy.currentFilterData.join(',')

    const priorityFilter = exclusion !== 'priority' && this.columnMenuSettings.priority.currentFilterData.join(',')

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
        title: { $eq: titleFilter },
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
      ...(subFilter && {
        sub: { $eq: subFilter },
      }),
      ...(priorityFilter && {
        priority: { $eq: priorityFilter },
      }),
    })

    return filter
  }

  async onClickFilterBtn(column) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'requests'),
        column,
        `requests?kind=${RequestSubType.MY}&filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onSelectRequest(index) {
    const newSelectedRequests = [...this.selectedRequests]
    const findRequestIndex = this.selectedRequests.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedRequests.splice(findRequestIndex, 1)
    } else {
      newSelectedRequests.push(index)
    }
    runInAction(() => {
      this.selectedRequests = newSelectedRequests
    })
  }

  onClickTableRow(item) {
    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-requests/custom-request?request-id=${item._id}`,
      '_blank',
    )

    win.focus()
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
