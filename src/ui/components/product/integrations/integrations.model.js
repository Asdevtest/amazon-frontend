import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductModel } from '@models/product-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { productIntegrationsColumns } from '@components/table/table-columns/product/integrations-columns'

import { addIdDataConverter, stockReportDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

export class IntegrationsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productId = undefined
  product = undefined

  showBindInventoryGoodsToStockModal = false
  showSuccessModal = false
  showInfoModal = false

  successInfoModalText = ''

  sellerBoardDailyData = []
  sellerBoardData = []

  paginationModel = { page: 0, pageSize: 15 }

  selectedRowIds = []

  columnsModel = productIntegrationsColumns()
  columnVisibilityModel = {}

  constructor({ history, productId }) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  getCurrentData() {
    return toJS(this.sellerBoardData)
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
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
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await Promise.all([this.getProductById(), this.getProductsWithSkuById()])

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
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

  async onUnlinkSkuSProduct() {
    try {
      await SellerBoardModel.unlinkSkuProduct({
        productId: this.productId,
        skus: this.sellerBoardData.filter(el => this.selectedRowIds.includes(el._id)).map(el => el.originalData.sku),
      })

      this.selectedRowIds = []
      this.successInfoModalText = t(TranslationKey['Unlink success'])
      this.onTriggerOpenModal('showSuccessModal')
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      this.successInfoModalText = t(TranslationKey['The product is bound'])
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
        this.sellerBoardData = stockReportDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      this.error = error

      this.sellerBoardData = []
    }
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.loadData()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
