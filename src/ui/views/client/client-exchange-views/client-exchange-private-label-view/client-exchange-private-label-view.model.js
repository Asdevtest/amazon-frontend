import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class ClientExchangePrivateLabelViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  drawerOpen = false

  productToPay = {}
  showConfirmPayModal = false

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
        this.productsVacant = result.sort(sortObjectsArrayByFiledDate('checkedat'))
      })
    } catch (error) {
      this.productsVacant = []
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onLaunchPrivateLabel(product, orderData) {
    try {
      const pickUpProductResult = await ClientModel.pickupProduct(product._id)
      console.log('pickUpProductResult ', pickUpProductResult)
      const makePaymentsResult = await ClientModel.makePayments([product._id])
      console.log('makePaymentsResult ', makePaymentsResult)

      await this.createOrder(product, orderData)

      this.loadData()
    } catch (error) {
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
        barCode: orderData.barCode,
        product: product._id,
      }
      const createOrderResult = await ClientModel.createOrder(createorderData)
      console.log('createOrderResult ', createOrderResult)
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickBuyProductBtn(product) {
    try {
      const makePaymentsResult = await ClientModel.makePayments([product._id])
      console.log('makePaymentsResult ', makePaymentsResult)
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  setProductToPay(selectedProduct) {
    this.productToPay = selectedProduct
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
