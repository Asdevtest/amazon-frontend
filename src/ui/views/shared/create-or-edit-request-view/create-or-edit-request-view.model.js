import {makeAutoObservable} from 'mobx'

import {texts} from '@constants/texts'

import {RequestModel} from '@models/request-model'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {onSubmitPostImages} from '@utils/upload-files'

const textConsts = getLocalizedTexts(texts, 'en').clientCreateRequestView

export class CreateOrEditRequestViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false

  showInfoModal = false

  requestToEdit = undefined

  infoModalText = ''

  uploadedFiles = []

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

  async onSubmitCreateRequest(data, files) {
    try {
      this.uploadedFiles = []

      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {...data, details: {...data.details, linksToMediaFiles: this.uploadedFiles}}

      await RequestModel.createRequest(dataWithFiles)

      this.infoModalText = textConsts.infoCreateRequest
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      console.log(error)

      this.infoModalText = textConsts.infoNoCreateRequest
      this.onTriggerOpenModal('showInfoModal')

      this.error = error
    }
  }

  async onSubmitEditRequest(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, {images: files, type: 'uploadedFiles'})
      }

      const dataWithFiles = {
        ...data,
        details: {...data.details, linksToMediaFiles: [...data.details.linksToMediaFiles, ...this.uploadedFiles]},
      }

      await RequestModel.editRequest(this.requestToEdit.request._id, dataWithFiles)

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
