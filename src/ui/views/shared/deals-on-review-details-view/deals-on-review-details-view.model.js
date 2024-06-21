import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class VacantDealsDetailsViewModel {
  history = undefined

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

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.requestId = history.location.state.requestId
      this.curProposalId = history.location.state.curProposalId
      this.requester = history.location.state.requester
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  get userInfo() {
    return UserModel.userInfo
  }

  loadData() {
    try {
      this.getDealsVacantCur()
      this.getCustomRequestById()
    } catch (error) {
      console.error(error)
    }
  }

  async getCustomRequestById() {
    try {
      const result = await RequestModel.getCustomRequestById(this.requestId)

      runInAction(() => {
        this.request = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getDealsVacantCur() {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustomByRequestId(this.requestId)

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmDeal(data) {
    try {
      await RequestProposalModel.requestProposalResultAccept(this.proposalId, { ...data })

      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/deals-on-review`)

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickRejectDeal(data) {
    try {
      await RequestProposalModel.requestProposalCancel(this.proposalId, { ...data })

      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/deals-on-review`)

      this.onTriggerOpenModal('showRejectModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickReworkDeal(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      await RequestProposalModel.requestProposalResultToCorrect(this.proposalId, {
        ...data,
        linksToMediaFiles: this.uploadedFiles,
      })

      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/deals-on-review`)

      this.onTriggerOpenModal('showReworkModal')
    } catch (error) {
      console.error(error)
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

  onSubmitSendInForRework(id) {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Are you sure you want to send the result for rework?']),
      onSubmit: () => {
        this.onTriggerOpenModal('showConfirmModal')
        this.onClickReworkDealModal(id)
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRejectDealModal(id) {
    this.proposalId = id

    this.onTriggerOpenModal('showRejectModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
