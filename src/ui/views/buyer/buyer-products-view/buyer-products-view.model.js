import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'

export class BuyerProductsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productsVacant = []
  drawerOpen = false
  rowsPerPage = 5
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getProductsVacant() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await BuyerModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickTableRow() {}

  async onDoubleClickTableRow(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await BuyerModel.pickupProduct(product._id)
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
