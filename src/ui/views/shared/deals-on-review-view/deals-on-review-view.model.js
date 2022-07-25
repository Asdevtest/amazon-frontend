import {makeAutoObservable, runInAction} from 'mobx'

import {RequestSubType, RequestType} from '@constants/request-type'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

export class DealsOnReviewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined
  dealsOnReview = true

  drawerOpen = false

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
        RequestSubType.LINKED_TO_ME,
      )

      runInAction(() => {
        this.deals = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickViewMore(id, client) {
    try {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review/deal-on-review`, {
        requestId: id,
        requester: client,
      })
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
