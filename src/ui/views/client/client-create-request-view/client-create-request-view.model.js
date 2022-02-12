import {makeAutoObservable} from 'mobx'

import {texts} from '@constants/texts'

import {RequestModel} from '@models/request-model'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientCreateRequestView

export class ClientCreateRequestViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  showInfoModal = false

  infoModalText = ''

  imagesForLoad = []
  uploadedImages = []

  readyImages = []
  progressValue = 0
  showProgress = false

  constructor({history}) {
    this.history = history

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSubmitCreateRequest(data) {
    try {
      await RequestModel.createRequest(data)

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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
