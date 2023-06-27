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

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
      if (location.state) {
        this.requestId = location.state.requestId
        this.curProposalId = location.state.curProposalId
        this.requester = location.state.requester
      }
    })
    makeAutoObservable(this, undefined, { autoBind: true })
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickGetToWork(id, requestId) {
    try {
      await RequestProposalModel.requestProposalLinkOrUnlinkSupervisor(id, { action: 'LINK' })
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review/deal-on-review`, {
        requestId,
        curProposalId: id,
      })
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  onClickGetToWorkModal() {
    this.onTriggerOpenModal('showConfirmModal')
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
