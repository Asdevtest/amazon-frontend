import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'

export class BuyerMyProductsViewModel {
  history = undefined
  requestStatus = undefined

  productsMy = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getProducsMy() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await BuyerModel.getProductsMy()
      this.productsMy = result
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }
}
