import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ProductModel} from '@models/product-model'
import {SellerBoardModel} from '@models/seller-board-model'
import {SettingsModel} from '@models/settings-model'

import {productIntegrationsColumns} from '@components/table-columns/product/integrations-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'

export class IntegrationsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productId = undefined
  product = undefined

  showBindInventoryGoodsToStockModal = false
  showSuccessModal = false
  showInfoModal = false

  sellerBoardDailyData = []
  sellerBoardData = []

  columnsModel = productIntegrationsColumns()

  constructor({history, productId}) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.loadData(),
    )
  }

  updateColumnsModel() {
    this.columnsModel = productIntegrationsColumns()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  getCurrentData() {
    return toJS(this.sellerBoardData)
  }

  async onClickBindInventoryGoodsToStockBtn() {
    try {
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getProductById()
      await this.getProductsWithSkuById()
      this.updateColumnsModel()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getStockGoodsByFilters(filter, isRecCall) {
    try {
      const result = await SellerBoardModel.getStockGoodsByFilters(filter)

      runInAction(() => {
        this.sellerBoardDailyData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      if (isRecCall) {
        this.getStockGoodsByFilters()
      } else {
        this.sellerBoardDailyData = []
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      }
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      this.onTriggerOpenModal('showSuccessModal')

      this.loadData()
    } catch (error) {
      this.onTriggerOpenModal('showInfoModal')

      console.log(error)
    }
  }

  async getProductsWithSkuById() {
    try {
      const result = await SellerBoardModel.getProductsWithSkuById(this.productId)

      runInAction(() => {
        this.sellerBoardData = addIdDataConverter(result)
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
