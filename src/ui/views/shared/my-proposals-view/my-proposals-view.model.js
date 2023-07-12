/* eslint-disable no-unused-vars */
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus, RequestProposalStatusTranslate } from '@constants/requests/request-proposal-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
} from '@constants/statuses/freelance-request-type'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

export class MyProposalsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  currentData = []

  currentProposal = null
  currentRequest = null

  searchMyRequestsIds = []
  requests = []
  requestsBase = []
  selectedProposalFilters = Object.keys(RequestProposalStatus).map(el => ({
    name: RequestProposalStatusTranslate(el),
    _id: el,
  }))

  selectedTaskType = freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]

  nameSearchValue = ''

  userInfo = []
  userRole = undefined

  showConfirmModal = false
  showRequestDesignerResultClientModal = false
  showRequestStandartResultModal = false
  showRequestResultModal = false
  selectedProposal = undefined

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
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

    reaction(
      () => this.nameSearchValue,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  onChangeViewMode(event, nextView) {
    runInAction(() => {
      this.viewMode = nextView
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
    if (this.nameSearchValue) {
      return toJS(this.requests).filter(
        el =>
          el?.title?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.proposals?.some(item =>
            item.createdBy?.name?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ) ||
          el?.humanFriendlyId?.toString().toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.createdBy?.name?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.proposals.some(
            el =>
              el.sub?.name?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
              el.createdBy?.name?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ),
        // String(el?.humanFriendlyId)?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.requests)
    }
  }

  onClickDeleteBtn(item) {
    runInAction(() => {
      this.selectedProposal = item
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.MY_PROPOSALS)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.MY_PROPOSALS]

    runInAction(() => {
      if (state) {
        this.viewMode = state.viewMode
        this.sortMode = state.sortMode
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

    this.setTableModeState()
  }

  getFilteredRequests() {
    let res

    if (Number(this.selectedTaskType) === Number(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT])) {
      res = this.requestsBase
    } else {
      res = this.requestsBase.filter(el => Number(el.typeTask) === Number(this.selectedTaskType))
    }

    const selectedStatuses = this.selectedProposalFilters.map(el => el._id)

    res = res.filter(el => el.proposals.some(e => selectedStatuses.includes(e.status)))

    return res
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
      details: { conditions: request.detailsCustom.conditions },
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
    // this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-proposals/custom-search-request`, {
    //   requestId: request._id,
    // })

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

  async getUserInfo() {
    const result = await UserModel.userInfo
    this.userInfo = result
    this.userRole = UserRoleCodeMap[result.role]
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUserInfo()
      await this.getRequestsCustom()
      this.getTableModeState()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getRequestsCustom() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await RequestModel.getRequestsCustom(this.user._id)

      runInAction(() => {
        this.requestsBase = result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

        this.requests = result
          .filter(el => {
            if (this.selectedTaskType === freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]) {
              return el
            } else {
              return Number(el.typeTask) === Number(this.selectedTaskType)
            }
          })
          .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

        // console.log('this.requests', this.requests)
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

      console.log('result', result)

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

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
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
}
