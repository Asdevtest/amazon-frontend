import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus, RequestProposalStatusTranslate } from '@constants/requests/request-proposal-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
} from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { GeneralModel } from '@models/general-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { FreelancerMyProposalsColumns } from '@components/table/table-columns/freelancer/freelancer-my-proposals-columns'

import { myProposalsDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

import { executedStatuses, filtersFields, inTheWorkStatuses, switcherConditions } from './my-proposals-view.constants'

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

  columnVisibilityModel = { requestCreatedBy: false }
  rowHandlers = {
    onClickDeleteButton: (proposalId, proposalStatus) => this.onClickDeleteBtn(proposalId, proposalStatus),
    onClickEditButton: (requestId, proposalId) => this.onClickEditBtn(requestId, proposalId),
    onClickResultButton: (requestId, proposalId) => this.onClickResultBtn(requestId, proposalId),
    onClickOpenButton: requestId => this.onClickOpenBtn(requestId),
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

  currentProposal = null
  currentRequest = null

  searchMyRequestsIds = []
  requests = []
  selectedProposalFilters = Object.keys(RequestProposalStatus).map(el => ({
    name: RequestProposalStatusTranslate(el),
    _id: el,
  }))

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  showRequestDetailModal = false
  showConfirmModal = false
  showRequestDesignerResultClientModal = false
  showRequestStandartResultModal = false
  showRequestResultModal = false
  selectedProposal = undefined

  isInTheWork = true
  switcherCondition = switcherConditions.inTheWork

  viewMode = tableViewMode.TABLE
  sortMode = tableSortMode.DESK

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  get currentData() {
    return this.requests
  }

  constructor({ history }) {
    this.history = history

    this.setDefaultStatuses()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeViewMode(value) {
    this.viewMode = value
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

  onClickDeleteBtn(proposalId, proposalStatus) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmTitle: t(TranslationKey.Attention),
      confirmMessage: t(TranslationKey['Are you sure you want to cancel the proposal?']),
      onClickConfirm: () => {
        this.cancelProposalHandler(proposalId, proposalStatus)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async cancelProposalHandler(proposalId, proposalStatus) {
    try {
      if (
        proposalStatus === RequestProposalStatus.CREATED ||
        proposalStatus === RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
        proposalStatus === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED
      ) {
        await RequestProposalModel.requestProposalCancelBeforDeal(proposalId)
      } else {
        await RequestProposalModel.requestProposalCancel(proposalId)
      }

      this.loadData()
    } catch (error) {
      console.log(error)
    }
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

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onClickTaskType(taskType) {
    this.selectedTaskType = taskType

    const isAllTasks = taskType === freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

    this.onChangeFullFieldMenuItem(isAllTasks ? [] : [taskType], 'typeTask', true)

    this.getRequestsProposalsPagMy()
  }

  onClickEditBtn(requestId, proposalId) {
    this.history.push(
      `/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-proposals/edit-proposal?proposalId=${proposalId}&requestId=${requestId}`,
    )
  }

  onClickOpenBtn(requestId) {
    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-proposals/custom-search-request?request-id=${requestId}`,
      '_blank',
    )

    win?.focus()
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getRequestsProposalsPagMy()
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsProposalsPagMy() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const response = await RequestProposalModel.getRequestProposalsPagMy({
        filters: this.getFilters(),
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.requests = myProposalsDataConverter(response.rows)
        this.rowCount = response.count
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)

      runInAction(() => {
        this.requests = []
        this.rowCount = 0
      })
    }
  }

  async getProposalById(proposalId) {
    try {
      const response = await RequestProposalModel.getRequestProposalsCustom(proposalId)

      runInAction(() => {
        this.currentProposal = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestById(requestId) {
    try {
      const response = await RequestModel.getCustomRequestById(requestId)

      runInAction(() => {
        this.currentRequest = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickResultBtn(requestId, proposalId) {
    await this.getRequestById(requestId)
    await this.getProposalById(proposalId)

    if (freelanceRequestTypeByCode[this.currentRequest?.request.typeTask] === freelanceRequestType.DESIGNER) {
      this.onTriggerOpenModal('showRequestDesignerResultClientModal')
    } else if (freelanceRequestTypeByCode[this.currentRequest?.request.typeTask] === freelanceRequestType.BLOGGER) {
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
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.currentSearchValue, exclusion, filtersFields, [
        'asin',
        'title',
        'humanFriendlyId',
      ]),
    )
  }

  getTableByColumn(column) {
    if (['status', 'createdBy', 'sub', 'updatedAt', 'reworkCounter', 'requestCreatedBy'].includes(column)) {
      return 'proposals'
    } else if (
      [
        'humanFriendlyId',
        'priority',
        'title',
        'maxAmountOfProposals',
        'timeoutAt',
        'requestCreatedBy',
        'taskComplexity',
        'typeTask',
        'announcement',
      ].includes(column)
    ) {
      return 'requests'
    } else if (['asin', 'skuByClient', 'amazonTitle', 'shop'].includes(column)) {
      return 'products'
    }
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        this.getTableByColumn(column),
        column,
        `request-proposals/pag/my?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          const filterData =
            column === 'status'
              ? data.filter(status =>
                  this.isInTheWork ? inTheWorkStatuses.includes(status) : executedStatuses.includes(status),
                )
              : data

          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: {
              ...this.columnMenuSettings[column],
              filterData,
            },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  onChangeFullFieldMenuItem(value, field, notResetTask) {
    if (!notResetTask) {
      this.selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]
    }

    this.columnMenuSettings[field].currentFilterData = value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.getRequestsProposalsPagMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getRequestsProposalsPagMy()
  }

  onClickResetFilters() {
    this.selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.setDefaultStatuses()

    this.getRequestsProposalsPagMy()
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  onOpenRequestDetailModal(id) {
    if (window.getSelection().toString()) {
      return
    }
    try {
      this.getRequestById(id)

      this.onTriggerOpenModal('showRequestDetailModal')
    } catch (error) {
      console.log(error)
    }
  }

  setDefaultStatuses() {
    this.onChangeFullFieldMenuItem(this.isInTheWork ? inTheWorkStatuses : executedStatuses, 'status')
  }

  onClickChangeCatigory(value) {
    this.switcherCondition = value

    if (value === switcherConditions.inTheWork) {
      this.isInTheWork = true
    } else {
      this.isInTheWork = false
    }

    this.setDefaultStatuses()

    this.getRequestsProposalsPagMy()
  }
}
