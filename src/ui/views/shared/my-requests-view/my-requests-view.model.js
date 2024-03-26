import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestStatus } from '@constants/requests/request-status'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { FeedbackModel } from '@models/feedback-model'
import { GeneralModel } from '@models/general-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { UserModel } from '@models/user-model'

import { myRequestsViewColumns } from '@components/table/table-columns/overall/my-requests-columns'

import { myRequestsDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getLocalToUTCDate } from '@utils/date-time'
import { getTableByColumn, objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { RequestSubType } from '@typings/enums/request/request-type'

import { allowStatuses, filtersFields } from './my-requests-view.constants'

export class MyRequestsViewModel {
  history = undefined
  requestStatus = undefined

  showRequestForm = false
  showConfirmModal = false
  showRequestDetailModal = false
  showConfirmWithCommentModal = false
  isAcceptedProposals = false

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
    error: undefined,
  }

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined
  currentRequestDetails = undefined

  curProposal = undefined

  showRequestDesignerResultClientModal = false
  showConfirmWorkResultFormModal = false
  showMainRequestResultModal = false
  showRequestResultModal = false

  nameSearchValue = ''
  onHover = null

  rowCount = 0

  searchRequests = []
  openModal = null

  confirmModalSettings = {
    isWarning: false,
    message: '',
    smallMessage: '',
    onSubmit: () => {
      this.showConfirmModal = false
      this.showConfirmWithCommentModal = false
    },
  }

  onListingFiltersData = {
    onListing: true,
    notOnListing: true,
    handleListingFilters: (onListing, notOnListing) => this.handleListingFilters(onListing, notOnListing),
  }

  requestFormSettings = {
    request: {},
    isEdit: false,
    onSubmit: data => this.onSubmitCreateCustomSearchRequest(data),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData?.length)
  }

  sortModel = []

  isRequestsAtWork = true
  onlyWaitedProposals = null
  switcherCondition = 'inProgress' // @params inProgress readyToCheck completed

  filterModel = { items: [] }
  densityModel = 'compact'

  rowHandlers = {
    onToggleUploadedToListing: (id, uploadedToListingState) =>
      this.onToggleUploadedToListing(id, uploadedToListingState),
    onClickOpenInNewTab: id => this.onClickOpenInNewTab(id),
  }

  columnsModel = myRequestsViewColumns(
    this.rowHandlers,
    () => this.columnMenuSettings,
    () => this.onHover,
  )

  acceptProposalResultSetting = {
    onSubmit: () => {},
  }

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: withoutUpdate => {
      this.onLeaveColumnField()

      if (!withoutUpdate) {
        this.getCustomRequests()
        this.getDataGridState()
      }
    },

    onListingFiltersData: this.onListingFiltersData,

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  get currentData() {
    return this.searchRequests
  }

  constructor({ history }) {
    this.history = history

    if (history.location?.state) {
      this.alertShieldSettings = {
        showAlertShield: history.location?.state?.showAcceptMessage,
        alertShieldMessage: history.location?.state?.acceptMessage,
        error: history.location?.state?.error,
      }

      const state = { ...history.location?.state }
      delete state?.acceptMessage
      delete state?.showAcceptMessage
      history.replace({ ...history.location, state })
    }

    this.setDefaultStatuses()

    makeAutoObservable(this, undefined, { autoBind: true })

    if (this.isRequestsAtWork) {
      this.onChangeFullFieldMenuItem(allowStatuses, 'status')
    }

    if (this.alertShieldSettings.showAlertShield) {
      setTimeout(() => {
        this.alertShieldSettings = {
          ...this.alertShieldSettings,
          showAlertShield: false,
        }

        setTimeout(() => {
          this.alertShieldSettings = {
            showAlertShield: false,
            alertShieldMessage: '',
          }
        }, 1000)
      }, 3000)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.getCustomRequests()
    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
    this.getCustomRequests()
  }

  onClickChangeCatigory(value) {
    this.switcherCondition = value
    if (value === 'inProgress') {
      this.isRequestsAtWork = true
      this.onlyWaitedProposals = null
    } else if (value === 'readyToCheck') {
      this.isRequestsAtWork = true
      this.onlyWaitedProposals = true
    } else if (value === 'completed') {
      this.isRequestsAtWork = false
      this.onlyWaitedProposals = null
    }
    this.setDefaultStatuses()
    this.getCustomRequests()
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

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getCustomRequests()
  }

  onHoverColumnField(field) {
    this.onHover = field
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,

      ...dataGridFiltersInitializer(filtersFields),
    }

    this.setDefaultStatuses()

    this.getCustomRequests()
    this.getDataGridState()
  }

  async setDefaultStatuses() {
    if (this.isRequestsAtWork) {
      this.onChangeFullFieldMenuItem(allowStatuses, 'status')
    } else {
      this.onChangeFullFieldMenuItem(
        Object.values(RequestStatus).filter(el => !allowStatuses.includes(el)),
        'status',
      )
    }
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getShops()
      await this.getCustomRequests()
    } catch (error) {
      console.error(error)
    }
  }

  async getShops() {
    try {
      const response = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopsData = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickAddBtn() {
    this.history.push(`/client/freelance/my-requests/create-request`)
  }

  onClickEditBtn() {
    this.history.push(
      `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/custom-request/edit-request`,
      { requestId: this.currentRequestDetails.request._id },
    )
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateCustomSearchRequest(data) {
    try {
      await this.createCustomSearchRequest(data)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequests()
    } catch (error) {
      console.error(error)
    }
  }

  async editCustomSearchRequest(data, requestId) {
    try {
      await RequestModel.editRequest(requestId, data)
    } catch (error) {
      console.error(error)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getCustomRequests()
  }

  async createCustomSearchRequest(data) {
    try {
      await RequestModel.createRequest(data)
    } catch (error) {
      console.error(error)
    }
  }

  onClickRemoveBtn(row) {
    this.researchIdToRemove = row.request._id

    this.onTriggerOpenModal('showConfirmModal')
  }

  async getCustomRequests() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const listingFilters = this.columnMenuSettings?.onListingFiltersData
      const additionalFilters =
        listingFilters?.notOnListing && listingFilters?.onListing
          ? ''
          : `;uploadedToListing[$eq]=${listingFilters?.onListing}`

      const result = await RequestModel.getRequests({
        kind: RequestSubType.MY,
        filters: this.getFilter() + additionalFilters,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        onlyWaitedProposals: this.onlyWaitedProposals,

        sortField: this.sortModel?.length ? this.sortModel[0]?.field : 'updatedAt',
        sortType: this.sortModel?.length ? this.sortModel[0]?.sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.searchRequests = myRequestsDataConverter(result.rows, this.shopsData)
        this.rowCount = result.count
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
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
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'requests'),
        column,
        `requests?${
          column === 'humanFriendlyId' && this.switcherCondition === 'readyToCheck' ? 'onlyWaitedProposals=true&' : ''
        }kind=${RequestSubType.MY}&filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        if (column === 'status') {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: {
              ...this.columnMenuSettings[column],
              filterData: this.isRequestsAtWork
                ? data.filter(el => allowStatuses.includes(el))
                : data.filter(el => !allowStatuses.includes(el)),
            },
          }
        } else {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onToggleUploadedToListing(id, uploadedToListingState) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await RequestModel.patchRequestsUploadedToListing({
        requestIds: [id],
        uploadedToListing: !uploadedToListingState,
      })

      await this.loadData()

      runInAction(() => {
        this.currentRequestDetails = {
          ...this.currentRequestDetails,
          request: {
            ...this.currentRequestDetails.request,
            uploadedToListing: !uploadedToListingState,
          },
        }
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
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

    this.selectedRequests = newSelectedRequests
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
    this.curPage = e
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  handleListingFilters(onListing, notOnListing) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      onListingFiltersData: {
        ...this.columnMenuSettings.onListingFiltersData,
        onListing,
        notOnListing,
      },
    }
    this.getCustomRequests()
  }

  async getRequestDetail(id) {
    try {
      const response = await RequestModel.getCustomRequestById(id)

      runInAction(() => {
        this.currentRequestDetails = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async handleOpenRequestDetailModal(e) {
    if (window.getSelection().toString()) {
      return
    }

    if (e.row.originalData.countProposalsByStatuses.acceptedProposals > 0) {
      this.isAcceptedProposals = true
    } else {
      this.isAcceptedProposals = false
    }

    await this.getRequestDetail(e.row._id)
    await this.getRequestProposals(e.row._id)
    this.onTriggerOpenModal('showRequestDetailModal')
  }

  async getRequestProposals(id) {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(id)

      const proposal = result?.sort((a, b) => new Date(b?.proposal?.updatedAt) - new Date(a?.proposal?.updatedAt))?.[0]

      runInAction(() => {
        this.curProposal = proposal
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.curProposal = undefined
      })
    }
  }

  async handleClickResultBtn(request) {
    try {
      switch (request.spec?.title) {
        case freelanceRequestType.DESIGNER:
          this.onTriggerOpenModal('showRequestDesignerResultClientModal')
          break

        case freelanceRequestType.BLOGGER:
          this.onTriggerOpenModal('showRequestResultModal')
          break

        default:
          this.onTriggerOpenModal('showMainRequestResultModal')
          break
      }
    } catch (error) {
      console.error(error)
    }
  }

  onClickOpenInNewTab(id) {
    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-requests/custom-request?request-id=${id}`,
      '_blank',
    )

    win.focus()
  }

  // * Request handlers

  async onDeleteRequest() {
    try {
      await RequestModel.deleteRequest(this.currentRequestDetails.request._id)

      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showRequestDetailModal')

      await this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Delete request?']),
      onSubmit: () => this.onDeleteRequest(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async toPublishRequest(totalCost) {
    try {
      await RequestModel.toPublishRequest(this.currentRequestDetails.request._id, { totalCost })

      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showRequestDetailModal')

      await this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickPublishBtn() {
    try {
      const result = await RequestModel.calculateRequestCost(this.currentRequestDetails.request._id)

      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          message: `${t(TranslationKey['The exact cost of the request will be:'])} ${toFixed(
            result.totalCost,
            2,
          )} $. ${t(TranslationKey['Confirm the publication?'])}`,
          onSubmit: () => {
            this.toPublishRequest(result.totalCost)
            this.confirmModalSettings.message = ''
          },
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onRecoverRequest(timeoutAt, maxAmountOfProposals) {
    this.setRequestStatus(loadingStatus.IS_LOADING)

    await RequestModel.updateDeadline(
      this.currentRequestDetails.request._id,
      getLocalToUTCDate(timeoutAt),
      maxAmountOfProposals,
    )
    await this.loadData()
    this.onTriggerOpenModal('showRequestDetailModal')

    this.setRequestStatus(loadingStatus.SUCCESS)
  }

  onClickAbortBtn() {
    this.onTriggerOpenModal('showConfirmWithCommentModal')
  }

  async onSubmitAbortRequest(comment) {
    try {
      await RequestModel.abortRequest(this.currentRequestDetails.request._id, { reason: comment })

      this.onTriggerOpenModal('showConfirmWithCommentModal')
      this.onTriggerOpenModal('showRequestDetailModal')

      await this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onMarkAsCompletedRequest(requestId) {
    try {
      await RequestModel.manualCompletedRequest(requestId)

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickMarkAsCompletedBtn(requestId) {
    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['Mark as completed'])}?`,
      onSubmit: () => {
        this.onMarkAsCompletedRequest(requestId)
        this.isAcceptedProposals = false
        this.onTriggerOpenModal('showRequestDetailModal')
        this.loadData()
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSendInForRework(id, fields) {
    try {
      await RequestProposalModel.requestProposalResultToCorrect(id, fields)

      this.onTriggerOpenModal('showRequestDetailModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickProposalResultAccept(proposalId) {
    this.acceptProposalResultSetting = {
      onSubmit: data => this.onClickProposalResultAcceptForm(proposalId, data),
    }

    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }

  async onClickProposalResultAcceptForm(proposalId, data) {
    try {
      await RequestProposalModel.requestProposalResultAccept(proposalId, data)
      await FeedbackModel.sendFeedback(this.curProposal?.proposal?.createdBy?._id, {
        rating: data.rating,
        comment: data.review,
      })

      this.onTriggerOpenModal('showConfirmWorkResultFormModal')

      this.onTriggerOpenModal('showRequestDetailModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }
}
