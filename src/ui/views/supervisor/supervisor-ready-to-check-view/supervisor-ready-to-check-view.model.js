import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SupervisorModel} from '@models/supervisor-model'

export class SupervisorReadyToCheckViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  selectedProducts = []

  productsReadyToCheck = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProducsReadyToCheck()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProducsReadyToCheck() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await SupervisorModel.getProducsVacant()
      this.setRequestStatus(loadingStatuses.success)
      runInAction(() => {
        this.productsReadyToCheck = result
      })
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
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

  async onDoubleClickTableRow(item) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      // eslint-disable-next-line no-underscore-dangle
      await SupervisorModel.pickupProduct(item._id)
      this.setActionStatus(loadingStatuses.success)
      this.loadData()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
