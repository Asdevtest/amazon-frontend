import {action, makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ProductForTestOnly} from '@models/product-for-test-only-model'

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined

  product = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFieldProduct = fieldsName =>
    action(e => {
      this.product[fieldsName] = e.target.value
    })

  async getProductData(id) {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await ProductForTestOnly.getProduct(id)
      this.product = result
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }
}
