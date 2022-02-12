import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {RequestSubType, RequestType} from '@constants/request-type'

import {RequestModel} from '@models/request-model'

export class FreelancerVacantRequestsViewModel {
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
      // await this.getMyCustomRequests()
      await this.getRequestsVacant()
    } catch (error) {
      console.log(error)
    }
  }

  // async getMyCustomRequests() {
  //   try {
  //     const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.ASSIGNEES)

  //     runInAction(() => {
  //       this.searchMyRequestsIds = result.map((item) => item.request._id)
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async getRequestsVacant() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.VACANT)

      runInAction(() => {
        this.requests = result // .filter((item) => !this.searchMyRequestsIds.includes(item.request._id))
      })
    } catch (error) {
      console.log(error)
    }
  }

  pushToRequestContent() {
    this.onTriggerOpenModal('showConfirmModal')

    this.pickupRequestById(this.tmpSelectedRow.request._id)
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
