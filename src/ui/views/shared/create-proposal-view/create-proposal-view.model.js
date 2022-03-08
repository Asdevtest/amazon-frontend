import {makeAutoObservable} from 'mobx'

import {texts} from '@constants/texts'

import {RequestModel} from '@models/request-model'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {onSubmitPostImages} from '@utils/upload-files'

const textConsts = getLocalizedTexts(texts, 'en').freelancerCreateProposalView

export class CreateProposalViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  request = undefined

  showInfoModal = false

  infoModalText = ''

  uploadedFiles = []

  readyImages = []
  progressValue = 0
  showProgress = false

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      this.request = location.state.request
    }

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSubmitCreateProposal(data, files) {
    try {
      this.uploadedFiles = []

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {...data, proposalDetails: {...data.proposalDetails, linksToMediaFiles: this.uploadedFiles}}

      await RequestModel.pickupRequestById(this.request.request._id, dataWithFiles)

      this.infoModalText = textConsts.infoCreateRequest
      this.onTriggerOpenModal('showInfoModal')
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
