import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class CreateOrEditProposalViewModel {
  history = undefined
  requestStatus = undefined

  uploadedFiles = []
  request = undefined
  proposalToEdit = undefined
  progressValue = 0
  showProgress = false

  showResultModal = false

  get userInfo() {
    return UserModel.userInfo
  }

  constructor(history) {
    this.history = history

    const url = new URL(window.location.href)

    const requestId = url.searchParams.get('requestId')
    const proposalId = url.searchParams.get('proposalId')

    this.getRequestById(requestId)
    if (proposalId) {
      this.getProposalById(proposalId)
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onSubmitEditProposal(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      const dataWithFiles = { ...data, linksToMediaFiles: this.uploadedFiles }

      await RequestProposalModel.updateRequestProposalCustom(this.proposalToEdit._id, dataWithFiles)

      if (this.proposalToEdit.status === RequestProposalStatus.OFFER_CONDITIONS_REJECTED) {
        await RequestProposalModel.requestProposalCorrected(this.proposalToEdit._id, {
          reason: data?.comment,
          linksToMediaFiles: dataWithFiles.linksToMediaFiles,
        })
      }

      toast.success(t(TranslationKey['Proposal changed']))

      this.onTriggerOpenModal('showResultModal')
    } catch (error) {
      console.error(error)

      toast.error(error.body.message)
    }
  }

  async onSubmitCreateProposal(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      const dataWithFiles = { ...data, linksToMediaFiles: this.uploadedFiles }

      await RequestModel.pickupRequestById(this.request.request._id, dataWithFiles)

      toast.success(t(TranslationKey['Proposal created by']))

      this.onTriggerOpenModal('showResultModal')
    } catch (error) {
      console.error(error)

      toast.error(t(TranslationKey['There are unresolved proposals for this request in your queue.']))
    }
  }

  onClickOkInfoModal() {
    this.onClickBackBtn()
  }

  onClickResultModal(setting) {
    if (setting.goBack) {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/vacant-requests`)
    } else {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-proposals`)
    }

    this.onTriggerOpenModal('showResultModal')
  }

  onClickBackBtn() {
    this.history.goBack()
  }

  goToMyRequest() {
    this.history.push(`/freelancer/freelance/my-proposals/custom-search-request?request-id=${this.request.request._id}`)
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async getProposalById(proposalId) {
    try {
      const response = await RequestProposalModel.getRequestProposalsCustom(proposalId)

      runInAction(() => {
        this.proposalToEdit = response?.proposal
      })
    } catch (err) {
      console.error(err)
    }
  }

  async getRequestById(requestId) {
    try {
      const response = await RequestModel.getCustomRequestById(requestId)

      runInAction(() => {
        this.request = response
      })
    } catch (err) {
      console.error(err)
    }
  }
}
