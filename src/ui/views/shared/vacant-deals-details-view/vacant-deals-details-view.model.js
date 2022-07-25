import {makeAutoObservable, runInAction} from 'mobx'

import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

export class VacantDealsDetailsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  requestId = undefined
  requester = undefined
  proposalId = undefined

  drawerOpen = false
  showConfirmModal = false
  showDetails = true

  requestProposals = []

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.requestId = location.state.requestId
      this.requester = location.state.requester
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  get user() {
    return UserModel.userInfo
  }

  async loadData() {
    try {
      await this.getDealsVacantCur()
    } catch (error) {
      console.log(error)
    }
  }

  async getDealsVacantCur() {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId)

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickGetToWork(id, requestId) {
    try {
      await RequestProposalModel.requestProposalLinkOrUnlinkSupervisor(id, {action: 'LINK'})
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review/deal-on-review`, {
        requestId,
      })
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  onClickGetToWorkModal(proposalId) {
    this.proposalId = proposalId
    this.onTriggerOpenModal('showConfirmModal')
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
