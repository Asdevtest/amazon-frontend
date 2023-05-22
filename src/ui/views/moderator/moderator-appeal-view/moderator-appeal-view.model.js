import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestSubType, RequestType } from '@constants/requests/request-type'

import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

export class ModeratorAppealsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  showConfirmModal = false
  requestId = undefined
  proposalId = undefined
  client = {}

  requests = []
  deals = []

  get user() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      await this.getDealsVacant()
    } catch (error) {
      console.log(error)
    }
  }

  async getDealsVacant() {
    try {
      const result = await RequestProposalModel.getRequestProposalsForSupervisor(
        RequestType.CUSTOM,
        RequestSubType.VACANT,
      )

      runInAction(() => {
        this.deals = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickViewMore(id) {
    try {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/vacant-deals/deal-details`, {
        requestId: id,
      })
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  async onClickGetToWork(id, requestId) {
    try {
      await RequestProposalModel.requestProposalLinkOrUnlinkSupervisor(id, { action: 'LINK' })
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review/deal-on-review`, {
        requestId,
      })
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      this.onTriggerOpenModal('showWarningModal')
      console.log(error)
    }
  }

  onClickGetToWorkModal(proposalId, requestId) {
    runInAction(() => {
      this.proposalId = proposalId
      this.requestId = requestId
    })

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
