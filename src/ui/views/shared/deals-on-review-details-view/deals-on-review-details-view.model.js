import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

import { onSubmitPostImages } from '@utils/upload-files'

export class VacantDealsDetailsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  requestId = undefined
  proposalId = undefined
  curProposalId = undefined

  showConfirmModal = false
  showRejectModal = false
  showReworkModal = false
  showDetails = true

  uploadedFiles = []

  request = []
  requestProposals = []

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
      if (location.state) {
        this.requestId = location.state.requestId
        this.curProposalId = location.state.curProposalId
        this.requester = location.state.requester
      }
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  get user() {
    return UserModel.userInfo
  }

  async loadData() {
    try {
      await Promise.all([this.getDealsVacantCur(), this.getCustomRequestById()])
    } catch (error) {
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
      runInAction(() => {
        this.error = error
      })
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickConfirmDeal(data) {
    try {
      await RequestProposalModel.requestProposalResultAccept(this.proposalId, { ...data })
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review`)
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickRejectDeal(data) {
    try {
      await RequestProposalModel.requestProposalCancel(this.proposalId, { ...data })
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review`)
      this.onTriggerOpenModal('showRejectModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickReworkDeal(data, files) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }
      await RequestProposalModel.requestProposalResultToCorrect(this.proposalId, {
        ...data,
        linksToMediaFiles: this.uploadedFiles,
      })
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/deals-on-review`)
      this.onTriggerOpenModal('showReworkModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickConfirmDealModal(id) {
    runInAction(() => {
      this.proposalId = id
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickReworkDealModal(id) {
    runInAction(() => {
      this.proposalId = id
    })
    this.onTriggerOpenModal('showReworkModal')
  }

  onClickRejectDealModal(id) {
    runInAction(() => {
      this.proposalId = id
    })
    this.onTriggerOpenModal('showRejectModal')
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
