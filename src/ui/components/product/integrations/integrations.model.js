import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductModel } from '@models/product-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { productIntegrationsColumns } from '@components/table/table-columns/product/integrations-columns'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class IntegrationsModel {
  requestStatus = undefined

  productId = undefined
  product = undefined

  showBindInventoryGoodsToStockModal = false

  sellerBoardDailyData = []
  sellerBoardData = []

  paginationModel = { page: 0, pageSize: 15 }

  selectedRowIds = []

  columnsModel = productIntegrationsColumns()
  columnVisibilityModel = {}

  get currentData() {
    return this.sellerBoardData
  }

  constructor({ productId }) {
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
    this.columnVisibilityModel = model
  }

  async onClickBindInventoryGoodsToStockBtn() {
    try {
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')
    } catch (error) {
      console.error(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await Promise.all([this.getProductById(), this.getProductsWithSkuById()])

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  async getStockGoodsByFilters(filter, isRecCall) {
    try {
      const result = await SellerBoardModel.getStockGoodsByFilters(filter)

      runInAction(() => {
        this.sellerBoardDailyData = result?.rows
      })
    } catch (error) {
      console.error(error)
      if (isRecCall) {
        this.getStockGoodsByFilters()
      } else {
        this.sellerBoardDailyData = []
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

      toast.success(t(TranslationKey['Unlink success']))

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      toast.success(t(TranslationKey['The product is bound']))

      this.loadData()
    } catch (error) {
      toast.error(t(TranslationKey["You can't bind"]))

      console.error(error)
    }
  }

  async getProductsWithSkuById() {
    try {
      const result = await SellerBoardModel.getProductsWithSkuById(this.productId)

      runInAction(() => {
        this.sellerBoardData = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.loadData()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
