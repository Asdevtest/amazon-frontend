import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SellerBoardModel} from '@models/seller-board-model'

import {productIntegrationsColumns} from '@components/table-columns/product/integrations-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'

export class IntegrationsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productId = undefined

  sellerBoardDailyData = []

  columnsModel = productIntegrationsColumns()

  constructor({history, productId}) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  getCurrentData() {
    return toJS(this.sellerBoardDailyData)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getProductsWithSkuById()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getProductsWithSkuById() {
    try {
      const result = await SellerBoardModel.getProductsWithSkuById(this.productId)

      runInAction(() => {
        this.sellerBoardDailyData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
