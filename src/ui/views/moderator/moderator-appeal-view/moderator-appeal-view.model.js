import {makeAutoObservable, runInAction} from 'mobx'

import {RequestSubType, RequestType} from '@constants/request-type'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

export class ModeratorAppealsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false
  showConfirmModal = false
  requestId = undefined
  proposalId = undefined
  client = {}

  requests = []
  deals = []

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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

  onClickGetToWorkModal(proposalId, requestId) {
    this.proposalId = proposalId
    this.requestId = requestId

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
