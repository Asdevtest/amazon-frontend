import {makeAutoObservable, runInAction} from 'mobx'

import {RequestProposalModel} from '@models/request-proposal'

export class VacantDealsDetailsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  requestId = undefined

  drawerOpen = false
  showConfirmModal = false
  showDetails = true

  requestProposals = []

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.requestId = location.state.requestId
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickGetToWorkModal() {
    this.onTriggerOpenModal('showConfirmModal')
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
