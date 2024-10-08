import { makeAutoObservable, runInAction } from 'mobx'

import { ProductStrategyStatus, mapProductStrategyStatusEnumToKey } from '@constants/product/product-strategy-status'
import { createOrderRequestWhiteList } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { ShopModel } from '@models/shop-model'
import { UserModel } from '@models/user-model'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'

import { loadingStatus } from '@typings/enums/loading-status'

export class ClientExchangePrivateLabelViewModel {
  history = undefined
  requestStatus = undefined

  productsVacant = []
  selectedProduct = {}
  shopsData = []
  selectedShopId = ''

  productToPay = {}
  showConfirmPayModal = false
  showSuccessModal = false

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await Promise.all([this.getProductsVacant(), this.getShops()])

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getProductsVacant() {
    try {
      const result = await ClientModel.getProductsVacant()

      runInAction(() => {
        this.productsVacant = result
          .filter(
            item => item.strategyStatus === mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL],
          )
          .sort(sortObjectsArrayByFiledDateWithParseISO('checkedAt'))
      })
    } catch (error) {
      runInAction(() => {
        this.productsVacant = []
      })
      console.error(error)
    }
  }

  async createOrder(product, orderData) {
    try {
      const createorderData = {
        status: 0,
        amount: orderData.amount,
        deliveryMethod: orderData.deliveryMethod,
        warehouse: orderData.warehouse,
        clientComment: orderData.clientComment,
        productId: product._id,
        images: [],
      }
      await ClientModel.createOrder(getObjectFilteredByKeyArrayWhiteList(createorderData, createOrderRequestWhiteList))
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()
      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveProductData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ClientModel.updateProduct(
        this.productToPay._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            shopId: this.selectedShopId,
          },
          ['suppliers'],
        ),
      )
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async onClickBuyProductBtn(shop) {
    try {
      await ClientModel.makePayments([this.productToPay._id])
      runInAction(() => {
        this.selectedShopId = shop?._id
      })

      await this.onSaveProductData()
      this.onTriggerOpenModal('showConfirmPayModal')
      this.onTriggerOpenModal('showOrderModal')

      this.onTriggerOpenModal('showSuccessModal')
      await this.updateUserInfo()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  setProductToPay(selectedProduct) {
    runInAction(() => {
      this.productToPay = selectedProduct
    })

    this.onTriggerOpenModal('showConfirmPayModal')
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
