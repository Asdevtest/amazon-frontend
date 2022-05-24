import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {tableViewMode} from '@constants/table-view-modes'

import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class MyProposalsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  searchMyRequestsIds = []
  requests = []

  showConfirmModal = false
  selectedProposal = undefined

  viewMode = tableViewMode.LIST

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeViewMode(event, nextView) {
    this.viewMode = nextView
  }

  getCurrentData() {
    return toJS(this.requests)
  }

  onClickDeleteBtn(item) {
    this.selectedProposal = item

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickEditBtn(request, proposal) {
    const convertedRequest = {
      details: {conditions: request.detailsCustom.conditions},
      request: {
        price: request.price,
        timeoutAt: request.timeoutAt,
      },
    }

    this.history.push('/create-or-edit-proposal', {request: toJS(convertedRequest), proposalToEdit: toJS(proposal)})
  }

  onClickOpenBtn(request) {
    this.history.push('/custom-search-request', {requestId: request._id, proposalIsExist: true})
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

  async loadData() {
    try {
      await this.getRequestsCustom()
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsCustom() {
    try {
      const result = await RequestModel.getRequestsCustom(this.user._id)

      runInAction(() => {
        this.requests = result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickViewMore(id) {
    try {
      this.history.push('/custom-search-request', {requestId: id})
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
