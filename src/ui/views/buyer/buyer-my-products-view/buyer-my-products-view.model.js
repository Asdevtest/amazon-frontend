import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'

export class BuyerMyProductsViewModel {
  history = undefined
  requestStatus = undefined

  productsMy = []
  drawerOpen = false
  rowsPerPage = 5
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getProductsMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await BuyerModel.getProductsMy()
      runInAction(() => {
        this.productsMy = result
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

  onClickTableRow(item) {
    this.history.push('/buyer/product', {product: toJS(item)})
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
