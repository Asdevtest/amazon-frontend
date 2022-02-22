import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {RequestSubType, RequestType} from '@constants/request-type'
import {tableViewMode} from '@constants/table-view-modes'

import {RequestModel} from '@models/request-model'

export class VacantRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  searchMyRequestsIds = []
  requests = []

  viewMode = tableViewMode.LIST

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

  async loadData() {
    try {
      await this.getRequestsVacant()
    } catch (error) {
      console.log(error)
    }
  }

  async getRequestsVacant() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.VACANT)

      runInAction(() => {
        this.requests = result
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
