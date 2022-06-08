import {makeAutoObservable, reaction, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {SUPERVISOR_PRODUCTS_HEAD_CELLS} from '@constants/table-head-cells'

import {SettingsModel} from '@models/settings-model'
import {SupervisorModel} from '@models/supervisor-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class SupervisorReadyToCheckByClientViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1

  productsReadyToCheck = []
  productHead = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.productHead = SUPERVISOR_PRODUCTS_HEAD_CELLS()
    }
  }

  updateProductHead() {
    this.productHead = SUPERVISOR_PRODUCTS_HEAD_CELLS()
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getProductsReadyToCheck()
      this.updateProductHead()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsReadyToCheck() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const isCreatedByClient = true

      const result = await SupervisorModel.getProductsVacant(isCreatedByClient)

      this.setRequestStatus(loadingStatuses.success)
      runInAction(() => {
        this.productsReadyToCheck = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
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

      this.history.push({
        pathname: '/supervisor/product',
        search: item._id,
      })
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
