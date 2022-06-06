import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {UserModel} from '@models/user-model'

import {onSubmitPostImages} from '@utils/upload-files'

export class SuppliersAndIdeasModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  progressValue = 0

  showSuccessModal = false
  showProgress = false
  tmpListingImages = []
  imagesToLoad = []

  get userRole() {
    return UserModel.userInfo?.role
  }

  constructor({history, productId}) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSaveSubmit() {
    try {
      await onSubmitPostImages.call(this, {images: this.tmpListingImages, type: 'imagesToLoad'})

      // await this.onSaveProductData()

      this.tmpListingImages = new Array()

      this.loadData()

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.error = error
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
