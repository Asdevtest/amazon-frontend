import {makeAutoObservable} from 'mobx'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class CreateOrEditProposalViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  request = undefined
  proposalToEdit = undefined

  showInfoModal = false
  showResultModal = false

  infoModalText = ''

  uploadedFiles = []

  readyImages = []
  progressValue = 0
  showProgress = false

  get user() {
    return UserModel.userInfo
  }

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      this.request = location.state.request

      this.proposalToEdit = location.state.proposalToEdit
    }

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSubmitEditProposal(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {...data, linksToMediaFiles: [...data.linksToMediaFiles, ...this.uploadedFiles]}

      await RequestProposalModel.updateRequestProposalCustom(this.proposalToEdit._id, dataWithFiles)

      if (this.proposalToEdit.status === RequestProposalStatus.OFFER_CONDITIONS_REJECTED) {
        await RequestProposalModel.requestProposalCorrected(this.proposalToEdit._id, {
          reason: data.comment,
          linksToMediaFiles: dataWithFiles.linksToMediaFiles,
        })
      }
      this.infoModalText = t(TranslationKey['Proposal changed'])
      this.onTriggerOpenModal('showResultModal')
    } catch (error) {
      console.log(error)

      this.infoModalText = error.body.message
      this.onTriggerOpenModal('showInfoModal')

      this.error = error
    }
  }

  async onSubmitCreateProposal(data, files) {
    try {
      this.uploadedFiles = []

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {...data, linksToMediaFiles: this.uploadedFiles}

      await RequestModel.pickupRequestById(this.request.request._id, dataWithFiles)

      this.infoModalText = t(TranslationKey['Proposal created by'])
      this.onTriggerOpenModal('showResultModal')
    } catch (error) {
      console.log(error)

      this.infoModalText = error.body.message
      this.onTriggerOpenModal('showInfoModal')

      this.error = error
    }
  }

  onClickOkInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
    this.history.goBack()
  }

  onClickResultModal(setting) {
    if (setting.goBack) {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/vacant-requests`)
    } else {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/freelance/my-proposals`)
    }

    this.onTriggerOpenModal('showResultModal')
  }

  onClickBackBtn() {
    this.history.goBack()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
