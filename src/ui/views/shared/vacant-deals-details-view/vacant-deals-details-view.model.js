import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

export class VacantDealsDetailsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  requestId = undefined
  requester = undefined
  proposalId = undefined
  curProposalId = undefined
  showConfirmModal = false
  showDetails = true

  requestProposals = []

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.requestId = history.location.state.requestId
      this.curProposalId = history.location.state.curProposalId
      this.requester = history.location.state.requester
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  get userInfo() {
    return UserModel.userInfo
  }

  loadData() {
    try {
      this.getDealsVacantCur()
    } catch (error) {
      console.error(error)
    }
  }

  async getDealsVacantCur() {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId)

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickGetToWork(id, requestId) {
    try {
      await RequestProposalModel.requestProposalLinkOrUnlinkSupervisor(id, { action: 'LINK' })
      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/deals-on-review/deal-on-review`, {
        requestId,
        curProposalId: id,
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.onTriggerOpenModal('showWarningModal')
    }
  }

  onClickGetToWorkModal() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
