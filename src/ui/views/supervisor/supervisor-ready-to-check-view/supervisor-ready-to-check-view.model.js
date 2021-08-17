import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SupervisorModel} from '@models/supervisor-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class SupervisorReadyToCheckViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1

  productsReadyToCheck = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProductsReadyToCheck()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsReadyToCheck() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await SupervisorModel.getProductsVacant()
      console.log(result)
      this.setRequestStatus(loadingStatuses.success)
      runInAction(() => {
        console.log(result.sort(sortObjectsArrayByFiledDate('createdat')))
        this.productsReadyToCheck = result.sort(sortObjectsArrayByFiledDate('createdat'))
      })
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
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

  async onClickTableRowBtn(item) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await SupervisorModel.pickupProduct(item._id)
      this.setActionStatus(loadingStatuses.success)
      this.history.push('/supervisor/product', {product: toJS(item)})
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
