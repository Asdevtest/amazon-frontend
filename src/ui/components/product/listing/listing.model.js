import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {OtherModel} from '@models/other-model'

export class ListingModel {
  requestStatus = undefined
  error = undefined
  product = undefined
  payments = []
  boxes = []
  curImage = undefined
  imagesFromBoxes = []

  showImageModal = false

  constructor({product}) {
    this.product = product
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getPayments()
      await this.getBoxes()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getPayments() {
    try {
      const result = await OtherModel.getPaymentsByProductId(this.product._id)

      runInAction(() => {
        this.payments = result
      })
    } catch (error) {
      this.payments = []
      console.log(error)
    }
  }

  getImagesFromBoxes(boxes) {
    this.imagesFromBoxes = boxes.reduce((sum, cur) => sum.concat(...cur.images), [])
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxesByProductId(this.product._id)

      runInAction(() => {
        this.boxes = result
        this.getImagesFromBoxes(result)
      })
    } catch (error) {
      this.payments = []
      console.log(error)
    }
  }

  onClickImg(img) {
    this.onTriggerOpenModal('showImageModal')
    this.setCurImage(img)
  }

  setCurImage(img) {
    this.curImage = img
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
