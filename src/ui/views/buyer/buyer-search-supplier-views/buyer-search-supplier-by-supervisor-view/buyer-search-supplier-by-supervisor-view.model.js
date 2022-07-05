import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'

import {depersonalizedPickColumns} from '@components/table-columns/depersonalized-pick-columns'

import {depersonalizedPickDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class BuyerSearchSupplierBySupervisorModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productsVacant = []

  drawerOpen = false

  showInfoModal = false

  selectedRowIds = []

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }

  columnsModel = depersonalizedPickColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  getCurrentData() {
    return toJS(this.productsVacant)
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getProductsVacant()
      this.updateProductsHead()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsVacant() {
    try {
      this.error = undefined
      const result = await BuyerModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISO('checkedAt')),
        )
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
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
      await BuyerModel.pickupProduct(item._id)

      if (!noPush) {
        this.history.push({
          pathname: '/buyer/search-supplier-by-supervisor/product',
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

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
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
