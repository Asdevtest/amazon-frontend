import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus, RequestProposalStatusTranslate } from '@constants/requests/request-proposal-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
} from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { GeneralModel } from '@models/general-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { FreelancerMyProposalsColumns } from '@components/table/table-columns/freelancer/freelancer-my-proposals-columns'

import { addIdDataConverter, myProposalsDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

// * Список полей для фильтраций

const filtersFields = [
  'status',
  'createdBy',
  'sub',
  'updatedAt',
  'humanFriendlyId',
  'priority',
  'title',
  'maxAmountOfProposals',
  'timeoutAt',
  'requestCreatedBy',
  'asin',
  'skusByClient',
  'amazonTitle',
]

export class MyProposalsViewModel {
  // * Pagination & Sort

  rowCount = 0
  sortModel = []
  densityModel = 'compact'
  paginationModel = { page: 0, pageSize: 15 }
  filterModel = { items: [] }
  selectedRowIds = []

  // * Table settings

  currentSettings = undefined

  columnVisibilityModel = {}
  rowHandlers = {
    onClickDeleteButton: proposal => this.onClickDeleteBtn(proposal),
    onClickEditButton: (request, proposal) => this.onClickEditBtn(request, proposal),
    onClickResultButton: (request, proposalId) => this.onClickResultBtn(request, proposalId),
    onClickOpenButton: request => this.onClickOpenBtn(request),
  }

  columnsModel = FreelancerMyProposalsColumns(this.rowHandlers)

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getRequestsProposalsPagMy()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  currentSearchValue = ''

  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  currentData = []

  currentProposal = null
  currentRequest = null

  searchMyRequestsIds = []
  requests = []
  selectedProposalFilters = Object.keys(RequestProposalStatus).map(el => ({
    name: RequestProposalStatusTranslate(el),
    _id: el,
  }))

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  userInfo = []
  userRole = undefined

  showConfirmModal = false
  showRequestDesignerResultClientModal = false
  showRequestStandartResultModal = false
  showRequestResultModal = false
  selectedProposal = undefined

  viewMode = tableViewMode.TABLE
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
    })

    if (location.state) {
      this.onClickOpenBtn(location.state?.request)

      const state = { ...history.location.state }
      delete state.task
      history.replace({ ...history.location, state })
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.requests,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )
  }

  onChangeViewMode(value) {
    runInAction(() => {
      this.viewMode = value
    })
  }

  onSelectProposalFilter(item) {
    if (this.selectedProposalFilters.some(el => el._id === item._id)) {
      this.selectedProposalFilters = this.selectedProposalFilters.filter(el => el._id !== item._id)
    } else {
      this.selectedProposalFilters.push(item)
    }

    this.requests = this.getFilteredRequests()
  }

  handleSelectAllProposalStatuses() {
    if (this.selectedProposalFilters.length === Object.keys(RequestProposalStatus).length) {
      this.selectedProposalFilters = []
    } else {
      this.selectedProposalFilters = Object.keys(RequestProposalStatus).map(el => ({
        name: RequestProposalStatusTranslate(el),
        _id: el,
      }))
    }

    this.requests = this.getFilteredRequests()
  }

  getCurrentData() {
    return toJS(this.requests)
  }

  onClickDeleteBtn(item) {
    runInAction(() => {
      this.selectedProposal = item
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.FREELANCER_MY_PROPOSALS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.FREELANCER_MY_PROPOSALS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
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

    this.setDataGridState()
  }

  onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })

    this.requests = this.getFilteredRequests()
  }

  onClickEditBtn(request, proposal) {
    const convertedRequest = {
      createdById: request.createdById,
      maxAmountOfProposals: request.maxAmountOfProposals,
      createdBy: {
        name: request.createdBy.name,
        rating: request.createdBy.rating,
        _id: request.createdBy._id,
      },
      details: { conditions: request?.detailsCustom?.conditions },
      request: {
        price: request.price,
        timeoutAt: request.timeoutAt,
      },
    }
    this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-proposals/edit-proposal`, {
      request: toJS(convertedRequest),
      proposalToEdit: toJS(proposal),
    })
  }

  onClickOpenBtn(request) {
    this.history.push(
      `/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-proposals/custom-search-request?request-id=${
        request._id
      }`,
    )
  }

  async onSubmitDeleteProposal() {
    try {
      if (
        this.selectedProposal.status === RequestProposalStatus.CREATED ||
        this.selectedProposal.status === RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
        this.selectedProposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED
      ) {
        await RequestProposalModel.requestProposalCancelBeforDeal(this.selectedProposal._id)
      } else {
        await RequestProposalModel.requestProposalCancel(this.selectedProposal._id)
      }
      this.onTriggerOpenModal('showConfirmModal')

      await this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  getUserInfo() {
    const result = UserModel.userInfo

    runInAction(() => {
      this.userInfo = result
      this.userRole = UserRoleCodeMap[result.role]
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUserInfo()
      await this.getRequestsProposalsPagMy()
      this.getDataGridState()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getRequestsProposalsPagMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await RequestProposalModel.getRequestProposalsPagMy({
        filters: this.getFilters(),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      }).then(response => {
        runInAction(() => {
          this.requests = myProposalsDataConverter(response.rows) || []
          this.rowCount = response.count
        })
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProposalById(proposalId) {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustom(proposalId)

      runInAction(() => {
        this.currentProposal = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickResultBtn(request, proposalId) {
    this.currentRequest = request

    this.getProposalById(proposalId)

    if (freelanceRequestTypeByCode[request.typeTask] === freelanceRequestType.DESIGNER) {
      this.onTriggerOpenModal('showRequestDesignerResultClientModal')
    } else if (freelanceRequestTypeByCode[request.typeTask] === freelanceRequestType.BLOGGER) {
      this.onTriggerOpenModal('showRequestResultModal')
    } else {
      this.onTriggerOpenModal('showRequestStandartResultModal')
    }
  }

  onChangeSearchValue(value) {
    this.currentSearchValue = value
    this.getRequestsProposalsPagMy()
  }

  getFilters(exclusion) {
    // const statusFilterData = exclusion !== 'status' ? this.columnMenuSettings.status.currentFilterData : []

    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.currentSearchValue,
        exclusion,
        filtersFields,
        ['asin', 'amazonTitle', 'createdBy', 'sub', 'requestCreatedBy'],
        // {
        //   ...(!statusFilterData.length && {
        //     status: {
        //       $eq: this.currentSettings.statuses.join(','),
        //     },
        //   }),
        // },
      ),
    )
  }

  getTableByColumn(column) {
    if (['status', 'createdBy', 'sub', 'updatedAt'].includes(column)) {
      return 'proposals'
    } else if (
      ['humanFriendlyId', 'priority', 'title', 'maxAmountOfProposals', 'timeoutAt', 'requestCreatedBy'].includes(column)
    ) {
      return 'requests'
    } else if (['asin', 'skusByClient', 'amazonTitle'].includes(column)) {
      return 'products'
    }
  }

  async onClickFilterBtn(column) {
    console.log('column', column)

    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)

      const data = await GeneralModel.getDataForColumn(
        this.getTableByColumn(column),
        column,
        `request-proposals/pag/my?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
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

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.getRequestsProposalsPagMy()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
      this.currentData = this.getCurrentData()
    })
    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
    this.setDataGridState()
    this.getRequestsProposalsPagMy()
  }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        ...dataGridFiltersInitializer(filtersFields),
      }
    })
    this.getRequestsProposalsPagMy()
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }
}
