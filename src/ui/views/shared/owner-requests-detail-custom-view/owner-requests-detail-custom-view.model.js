import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'

export class OwnerRequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  requestId = undefined
  request = undefined
  requestProposals = []

  showConfirmModal = false
  showRequestForm = false
  showConfirmWithCommentModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onSubmit: () => {},
  }

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.requestId = location.state.request._id
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getCustomRequestById()
      this.getCustomProposalsByRequestId()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getCustomRequestById() {
    try {
      const result = await RequestModel.getCustomRequestById(this.requestId)

      runInAction(() => {
        this.request = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getCustomProposalsByRequestId() {
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

  async toPublishRequest(totalCost) {
    try {
      await RequestModel.toPublishRequest(this.requestId, {totalCost})

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickPublishBtn() {
    try {
      const result = await RequestModel.calculateRequestCost(this.requestId)
      console.log('result', result)

      this.confirmModalSettings = {
        isWarning: false,
        message: `Точная стоимость заявки составит: ${result.totalCost} $. Подтвердить публикацию?`,
        onSubmit: () => this.toPublishRequest(result.totalCost),
      }

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickEditBtn() {
    this.history.push('/client/create-or-edit-request', {request: toJS(this.request)})
  }

  async onSubmitAbortRequest(comment) {
    try {
      await RequestModel.abortRequest(this.requestId, {reason: comment})

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickAbortBtn() {
    this.onTriggerOpenModal('showConfirmWithCommentModal')
  }

  async onDeleteRequest() {
    try {
      await RequestModel.deleteRequest(this.requestId)

      this.onTriggerOpenModal('showConfirmModal')

      this.history.goBack()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      message: `Отменить заявку?`,
      onSubmit: () => this.onDeleteRequest(),
    }
    this.onTriggerOpenModal('showConfirmModal')
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
