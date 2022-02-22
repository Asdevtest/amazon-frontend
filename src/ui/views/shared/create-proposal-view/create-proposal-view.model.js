import {makeAutoObservable} from 'mobx'

import {texts} from '@constants/texts'

import {RequestModel} from '@models/request-model'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').freelancerCreateProposalView

export class CreateProposalViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  request = undefined

  showInfoModal = false

  infoModalText = ''

  imagesForLoad = []
  uploadedImages = []

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

  async onSubmitCreateProposal(data) {
    try {
      await RequestModel.pickupRequestById(this.request.request._id, data)

      this.infoModalText = textConsts.infoCreateRequest
      this.onTriggerOpenModal('showInfoModal')

      this.history.goBack()
    } catch (error) {
      console.log(error)

      this.infoModalText = textConsts.infoNoCreateRequest
      this.onTriggerOpenModal('showInfoModal')

      this.error = error
    }
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
