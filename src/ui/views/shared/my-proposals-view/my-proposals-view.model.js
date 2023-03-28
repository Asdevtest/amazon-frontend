/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {freelanceRequestType, freelanceRequestTypeByKey} from '@constants/freelance-request-type'
import {RequestProposalStatus} from '@constants/request-proposal-status'
import {tableSortMode, tableViewMode} from '@constants/table-view-modes'
import {UserRoleCodeMap, UserRoleCodeMapForRoutes} from '@constants/user-roles'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {checkIsFreelancer} from '@utils/checks'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class MyProposalsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  currentData = []

  searchMyRequestsIds = []
  requests = []
  requestsBase = []

  selectedTaskType = undefined

  nameSearchValue = ''

  userInfo = []
  userRole = undefined

  showConfirmModal = false
  selectedProposal = undefined

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

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

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.requests).filter(
        el =>
          el?.title?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.createdBy?.name?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
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
    const state = {viewMode: this.viewMode, sortMode: this.sortMode}

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

  onClickTaskType(taskType) {
    runInAction(() => {
      this.selectedTaskType = taskType
    })
    // this.getRequestsCustom()

    this.requests = this.requestsBase.filter(el => +el.typeTask === +taskType)
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
      details: {conditions: request.detailsCustom.conditions},
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
    this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-proposals/custom-search-request`, {
      requestId: request._id,
    })
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

    console.log('getUserInfo', result)

    this.userInfo = result
    this.userRole = UserRoleCodeMap[result.role]
  }

  async loadData() {
    try {
      await this.getUserInfo()

      runInAction(() => {
        this.selectedTaskType = checkIsFreelancer(this.userRole)
          ? this.userInfo.allowedSpec.sort()[0]
          : freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]
      })

      await this.getRequestsCustom()

      this.getTableModeState()
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsCustom() {
    try {
      const result = await RequestModel.getRequestsCustom(this.user._id)

      runInAction(() => {
        this.requestsBase = result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

        this.requests = result
          .filter(el => +el.typeTask === this.selectedTaskType)
          .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  // async onClickViewMore(id) {
  //   try {
  //     this.history.push('/custom-search-request', {requestId: id})
  //   } catch (error) {
  //     this.onTriggerOpenModal('showWarningModal')
  //     console.log(error)
  //   }
  // }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
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
}
