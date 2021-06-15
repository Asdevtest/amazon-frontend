import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'


export class ClientExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  drawerOpen = false
  curPage = 1
  rowsPerPage = 5
  showPrivateLabelModal = false
  selectedProductIndex = undefined
  modalQty = undefined
  modalManagerIndex = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsVacant()
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
        this.productsMy = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickLaunchPrivateLabelBtn(product) {
    try {
      const pickUpProductResult = await ClientModel.pickupProduct(product._id)
      console.log('pickUpProductResult ', pickUpProductResult)
      const makePaymentsResult = await ClientModel.makePayments([product._id])
      console.log('makePaymentsResult ', makePaymentsResult)
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

  onChangeManager(e) {
    this.modalManagerIndex = Number(e.target.value)
  }

  onChangeModalQty(e) {
    this.modalQty = Number(e.target.value)
  }

  onClickUsername() {
    this.history.push('/user/subusers')
  }

  onClickCancelBtn = () => {
    this.onTriggerPrivateLabelModal()
  }

  onClickOrderNowBtn = () => {
    this.onTriggerPrivateLabelModal()
  }

  onClickPrivateLabelBtn(index) {
    this.selectedProductIndex = index
    this.onTriggerQtyModal()
    // this.modalQty = modalTableProductList[index].qty
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerPrivateLabelModal() {
    this.showPrivateLabelModal = false
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
