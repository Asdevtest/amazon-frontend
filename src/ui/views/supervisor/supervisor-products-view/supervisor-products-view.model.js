import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SupervisorModel} from '@models/supervisor-model'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  selectedProducts = []

  productsMy = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProducsMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProducsMy() {
    try {
      const result = await SupervisorModel.getProducsMy()
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

  onSelectProduct(item, index) {
    const selectedProducts = [...this.selectedProducts]
    const newSelectedProducts = [...selectedProducts]
    const findRequestIndex = selectedProducts.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedProducts.splice(findRequestIndex, 1)
    } else {
      newSelectedProducts.push(index)
    }
    this.selectedProducts = newSelectedProducts
  }

  onClickTableRow(item) {
    this.history.push('/supervisor/product', {product: toJS(item)})
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onClickCalculateFees() {}

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
