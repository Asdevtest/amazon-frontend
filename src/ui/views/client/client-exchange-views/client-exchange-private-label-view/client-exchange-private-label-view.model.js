import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {mapProductStrategyStatusEnumToKey, ProductStrategyStatus} from '@constants/product-strategy-status'

import {ClientModel} from '@models/client-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class ClientExchangePrivateLabelViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  selectedProduct = {}
  drawerOpen = false

  productToPay = {}
  showConfirmPayModal = false
  showSuccessModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getProductsVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
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
      this.productsVacant = []
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
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
      await ClientModel.createOrder(createorderData)
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async onClickBuyProductBtn(product) {
    try {
      await ClientModel.makePayments([product._id])

      this.onTriggerOpenModal('showConfirmPayModal')
      this.onTriggerOpenModal('showOrderModal')

      this.onTriggerOpenModal('showSuccessModal')
      await this.updateUserInfo()
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  setProductToPay(selectedProduct) {
    this.productToPay = selectedProduct

    this.onTriggerOpenModal('showConfirmPayModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
