import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SupervisorModel} from '@models/supervisor-model'

import {depersonalizedPickColumns} from '@components/table-columns/depersonalized-pick-columns'

import {depersonalizedPickDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class SupervisorReadyToCheckByClientViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false
  showInfoModal = false

  selectedRowIds = []

  productsReadyToCheck = []

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }

  columnsModel = depersonalizedPickColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  getCurrentData() {
    return toJS(this.productsReadyToCheck)
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getProductsReadyToCheck()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsReadyToCheck() {
    try {
      const isCreatedByClient = true

      const result = await SupervisorModel.getProductsVacant(isCreatedByClient)

      runInAction(() => {
        this.productsReadyToCheck = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')),
        )
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  async onPickupSomeItems() {
    try {
      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const itemId = this.selectedRowIds[i]

        await this.onClickTableRowBtn({_id: itemId}, true)
      }

      this.selectedRowIds = []
      this.onTriggerOpenModal('showInfoModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickTableRowBtn(item, noPush) {
    try {
      await SupervisorModel.pickupProduct(item._id)

      if (!noPush) {
        this.history.push({
          pathname: '/supervisor/ready-to-check-by-client/product',
          search: item._id,
        })
      }
    } catch (error) {
      console.log(error)
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
