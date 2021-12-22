import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'

export class ClientRequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  request = undefined
  requestProposals = []

  showConfirmModal = false
  showRequestForm = false

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.request = location.state.request
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getCustomRequestById()
      this.getCustomRequestProposalsByRequestId()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getCustomRequestById() {
    try {
      const result = await RequestModel.getCustomRequestById(this.request.request._id)

      runInAction(() => {
        this.request = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getCustomRequestProposalsByRequestId() {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.request.request._id)

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitEditCustomSearchRequest(data, requestId) {
    try {
      await this.editCustomSearchRequest(data, requestId)

      this.onTriggerOpenModal('showRequestForm')
      this.getCustomRequestById()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async editCustomSearchRequest(data, requestId) {
    try {
      await RequestModel.updateCustomRequest(requestId, data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async removeCustomSearchRequest() {
    try {
      await RequestModel.removeCustomRequests(this.request.request._id)

      this.onTriggerOpenModal('showConfirmModal')
      this.history.goBack()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCLickAcceptProposals() {
    if (!this.requestProposals.length) {
      return
    }
    try {
      await RequestModel.completeRequest(
        this.request.request._id,
        this.requestProposals.map(requestProposal => requestProposal.proposal._id),
      )

      this.history.goBack()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
