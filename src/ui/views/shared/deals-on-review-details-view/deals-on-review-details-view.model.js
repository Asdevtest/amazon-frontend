import {makeAutoObservable, runInAction} from 'mobx'

import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {onSubmitPostImages} from '@utils/upload-files'

export class VacantDealsDetailsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  requestId = undefined
  proposalId = undefined

  drawerOpen = false
  showConfirmModal = false
  showRejectModal = false
  showReworkModal = false
  showDetails = true

  uploadedFiles = []

  requestProposals = []

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.requestId = location.state.requestId
      this.requester = location.state.requester
    }
    makeAutoObservable(this, undefined, {autoBind: true})
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
      this.error = error
    }
  }

  async onClickConfirmDeal(data) {
    try {
      await RequestProposalModel.requestProposalResultAccept(this.proposalId, {...data})
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review`)
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickRejectDeal(data) {
    try {
      await RequestProposalModel.requestProposalCancel(this.proposalId, {...data})
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review`)
      this.onTriggerOpenModal('showRejectModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickReworkDeal(data, files) {
    try {
      this.uploadedFiles = []

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }
      await RequestProposalModel.requestProposalResultToCorrect(this.proposalId, {
        ...data,
        linksToMediaFiles: this.uploadedFiles,
      })
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review`)
      this.onTriggerOpenModal('showReworkModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickConfirmDealModal(id) {
    this.proposalId = id
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickReworkDealModal(id) {
    this.proposalId = id
    this.onTriggerOpenModal('showReworkModal')
  }

  onClickRejectDealModal(id) {
    this.proposalId = id
    this.onTriggerOpenModal('showRejectModal')
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
