import {makeAutoObservable} from 'mobx'

import {texts} from '@constants/texts'

import {RequestModel} from '@models/request-model'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientCreateRequestView

export class CreateOrEditRequestViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  showInfoModal = false

  requestToEdit = undefined

  infoModalText = ''

  imagesForLoad = []
  uploadedImages = []

  readyImages = []
  progressValue = 0
  showProgress = false

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      this.requestToEdit = location.state.request
    }

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

  async onSubmitEditRequest(data) {
    try {
      await RequestModel.editRequest(this.requestToEdit.request._id, data)

      this.infoModalText = textConsts.infoEditRequest
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      console.log(error)

      this.infoModalText = textConsts.infoNoEditRequest
      this.onTriggerOpenModal('showInfoModal')

      this.error = error
    }
  }

  onClickOkInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
    this.history.goBack()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
