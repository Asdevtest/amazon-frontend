import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {RequestSubType, RequestType} from '@constants/request-type'

import {RequestModel} from '@models/request-model'

export class FreelancerRequestsInWorkViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  searchMyRequestsIds = []
  requests = []
  tmpSelectedRow = {}

  showConfirmModal = false
  showWarningModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  getCurrentData() {
    return toJS(this.requests)
  }

  async loadData() {
    try {
      await this.getRequestsPickedByMe()
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsPickedByMe() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.PICKUPED_BY_ME)

      runInAction(() => {
        this.requests = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  pushToRequestContent() {
    this.onTriggerOpenModal('showConfirmModal')

    this.pickupRequestById(this.tmpSelectedRow.request._id)
  }

  onClickRquestCard(request) {
    this.history.push('/freelancer/custom-search-request', {requestId: request._id})
  }

  async pickupRequestById(id) {
    try {
      await RequestModel.pickupRequestById(id)

      this.history.push('/freelancer/custom-search-request', {request: toJS(this.tmpSelectedRow)})
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
