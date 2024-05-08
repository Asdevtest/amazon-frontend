/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid-premium'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { showResultRequestProposalsStatuses } from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { FeedbackModel } from '@models/feedback-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

import { myRequestsViewColumns } from '@components/table/table-columns/overall/my-requests-columns'

import { getLocalToUTCDate } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { RequestSubType } from '@typings/enums/request/request-type'
import { ICustomRequest } from '@typings/models/requests/custom-request'
import { IRequest } from '@typings/models/requests/request'
import { IFullUser } from '@typings/shared/full-user'

import { allowStatuses, fieldsForSearch, filtersFields } from './my-requests-view.constants'
import { SwitcherCondition } from './my-requests-view.type'
import { observerConfig } from './observer-config'

export class MyRequestsViewModel extends DataGridFilterTableModel {
  showRequestForm = false
  showConfirmModal = false
  showRequestDetailModal = false
  showConfirmWithCommentModal = false
  isAcceptedProposals = false

  selectedIndex = null
  selectedRequests = []
  researchIdToRemove = undefined
  currentRequestDetails: any = undefined

  curProposal: ICustomRequest | null = null

  openModal = null
  showRequestDesignerResultClientModal = false
  showConfirmWorkResultFormModal = false
  showMainRequestResultModal = false
  showRequestResultModal = false

  searchRequests = []

  requestFormSettings = {
    request: {},
    isEdit: false,
    onSubmit: (data: any) => this.onSubmitCreateCustomSearchRequest(data),
  }

  get userInfo(): IFullUser {
    // @ts-ignore
    return UserModel.userInfo
  }

  isRequestsAtWork = true
  onlyWaitedProposals = false
  switcherCondition = SwitcherCondition.IN_PROGRESS

  acceptProposalResultSetting = {}

  constructor({ history }: { history: History }) {
    const rowHandlers = {
      onToggleUploadedToListing: (id: string, uploadedToListingState: boolean) =>
        this.onToggleUploadedToListing(id, uploadedToListingState),
      onClickOpenInNewTab: (id: string) => this.onClickOpenInNewTab(id),
    }

    const defaultGetCurrentDataOptions = () => ({
      kind: RequestSubType.MY,
      onlyWaitedProposals: this.onlyWaitedProposals,
    })

    const additionalPropertiesColumnMenuSettings = {
      onListingFiltersData: {
        onListing: true,
        notOnListing: true,
        handleListingFilters: (onListing: boolean, notOnListing: boolean) =>
          this.handleListingFilters(onListing, notOnListing),
      },
    }

    const additionalPropertiesGetFilters = () => {
      const listingFilters = this.columnMenuSettings?.onListingFiltersData
      const additionalFilters = listingFilters?.notOnListing && listingFilters?.onListing

      return {
        ...(!additionalFilters && {
          uploadedToListing: {
            $eq: listingFilters?.onListing,
          },
        }),
      }
    }

    super({
      getMainDataMethod: RequestModel.getRequests,
      columnsModel: myRequestsViewColumns(rowHandlers) as GridColDef[],
      filtersFields,
      mainMethodURL: `requests?kind=${RequestSubType.MY}&`,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.OVERALL_CUSTOM_SEARCH_REQUESTS,
      defaultGetCurrentDataOptions,
      additionalPropertiesColumnMenuSettings,
      additionalPropertiesGetFilters,
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.history = history

    this.setDefaultStatuses()

    if (this.isRequestsAtWork) {
      this.onChangeFullFieldMenuItem(allowStatuses, 'status')
    }

    this.loadData()
  }

  onClickChangeCatigory(value: SwitcherCondition) {
    this.switcherCondition = value
    if (value === SwitcherCondition.IN_PROGRESS) {
      this.isRequestsAtWork = true
      this.onlyWaitedProposals = false
      this.mainMethodURL = `requests?kind=${RequestSubType.MY}`
    } else if (value === SwitcherCondition.READY_TO_CHECK) {
      this.isRequestsAtWork = true
      this.onlyWaitedProposals = true
      this.mainMethodURL = `requests?kind=${RequestSubType.MY}&onlyWaitedProposals=true&`
    } else if (value === SwitcherCondition.COMPLETED) {
      this.isRequestsAtWork = false
      this.onlyWaitedProposals = false
      this.mainMethodURL = `requests?kind=${RequestSubType.MY}`
    }
    this.setDefaultStatuses()
    this.getCurrentData()
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
      await this.getCurrentData()
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

  async onSubmitEditCustomSearchRequest(data: any, requestId: string) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateCustomSearchRequest(data: any) {
    try {
      await this.createCustomSearchRequest(data)

      this.onTriggerOpenModal('showRequestForm')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async editCustomSearchRequest(data: any, requestId: string) {
    try {
      await RequestModel.editRequest(requestId, data)
    } catch (error) {
      console.error(error)
    }
  }

  async createCustomSearchRequest(data: any) {
    try {
      await RequestModel.createRequest(data)
    } catch (error) {
      console.error(error)
    }
  }

  onClickRemoveBtn(row: any) {
    this.researchIdToRemove = row.request._id

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onToggleUploadedToListing(id: string, uploadedToListingState: any) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }

  onSelectRequest(index: number) {
    const newSelectedRequests = [...this.selectedRequests]
    // @ts-ignore
    const findRequestIndex = this.selectedRequests.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedRequests.splice(findRequestIndex, 1)
    } else {
      // @ts-ignore
      newSelectedRequests.push(index)
    }

    this.selectedRequests = newSelectedRequests
  }

  onClickTableRow(item: any) {
    window
      ?.open(
        `${window.location.origin}/${
          UserRoleCodeMapForRoutes[this.userInfo.role]
        }/freelance/my-requests/custom-request?request-id=${item._id}`,
        '_blank',
      )
      ?.focus()
  }

  handleListingFilters(onListing: boolean, notOnListing: boolean) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      onListingFiltersData: {
        ...this.columnMenuSettings.onListingFiltersData,
        onListing,
        notOnListing,
      },
    }
    this.getCurrentData()
  }

  async getRequestDetail(id: string) {
    try {
      const response = await RequestModel.getCustomRequestById(id)

      runInAction(() => {
        this.currentRequestDetails = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async handleOpenRequestDetailModal(e: any) {
    if (window?.getSelection?.()?.toString()) {
      return
    }

    if (e.row.countProposalsByStatuses.acceptedProposals > 0) {
      this.isAcceptedProposals = true
    } else {
      this.isAcceptedProposals = false
    }

    await this.getRequestDetail(e.row._id)
    await this.getRequestProposals(e.row._id)
    this.onTriggerOpenModal('showRequestDetailModal')
  }

  async getRequestProposals(id: string) {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(id)

      const currentProposal = result
        ?.filter(item => showResultRequestProposalsStatuses.includes(item?.proposal?.status || ''))
        // @ts-ignore
        ?.sort((a, b) => new Date(b?.proposal?.updatedAt) - new Date(a?.proposal?.updatedAt))?.[0]

      runInAction(() => {
        this.curProposal = currentProposal as ICustomRequest
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.curProposal = null
      })
    }
  }

  async handleClickResultBtn(request: IRequest) {
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

  onClickOpenInNewTab(id: string) {
    window
      ?.open(
        `${window.location.origin}/${
          UserRoleCodeMapForRoutes[this.userInfo.role]
        }/freelance/my-requests/custom-request?request-id=${id}`,
        '_blank',
      )
      ?.focus()
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
      title: '',
      message: t(TranslationKey['Delete request?']),
      onSubmit: () => this.onDeleteRequest(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async toPublishRequest(totalCost: number) {
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
          title: '',
          message: `${t(TranslationKey['The exact cost of the request will be:'])} ${toFixed(
            result.totalCost,
            2,
          )} $. ${t(TranslationKey['Confirm the publication?'])}`,
          onSubmit: () => {
            this.toPublishRequest(result.totalCost || 0)
            this.confirmModalSettings.message = ''
          },
          onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onRecoverRequest(timeoutAt: string, maxAmountOfProposals: number) {
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

  async onSubmitAbortRequest(comment: string) {
    try {
      await RequestModel.abortRequest(this.currentRequestDetails.request._id, { reason: comment })

      this.onTriggerOpenModal('showConfirmWithCommentModal')
      this.onTriggerOpenModal('showRequestDetailModal')

      await this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onMarkAsCompletedRequest(requestId: string) {
    try {
      await RequestModel.manualCompletedRequest(requestId)

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickMarkAsCompletedBtn(requestId: string) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: `${t(TranslationKey['Mark as completed'])}?`,
      onSubmit: () => {
        this.onMarkAsCompletedRequest(requestId)
        this.isAcceptedProposals = false
        this.onTriggerOpenModal('showRequestDetailModal')
        this.loadData()
      },
      onCancel: () => {
        this.onTriggerOpenModal('showRequestDetailModal')
        this.onTriggerOpenModal('showConfirmModal')
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSendInForRework(id: string, fields: any) {
    try {
      await RequestProposalModel.requestProposalResultToCorrect(id, fields)

      this.onTriggerOpenModal('showRequestDetailModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickProposalResultAccept(proposalId: string) {
    this.acceptProposalResultSetting = {
      onSubmit: (data: any) => this.onClickProposalResultAcceptForm(proposalId, data),
    }

    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }

  async onClickProposalResultAcceptForm(proposalId: string, data: any) {
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
