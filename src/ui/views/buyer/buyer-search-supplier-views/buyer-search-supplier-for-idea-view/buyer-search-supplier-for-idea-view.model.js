import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'
import {IdeaModel} from '@models/ideas-model'

import {buyerSearchSuppliersViewColumns} from '@components/table-columns/buyer/buyer-seach-suppliers-columns'

import {depersonalizedPickDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class BuyerSearchSupplierForIdeaModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productsVacant = []
  supplierSearchRequestsVacant = []

  drawerOpen = false

  showInfoModal = false

  selectedRowIds = []

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }

  firstRowId = undefined

  columnsModel = buyerSearchSuppliersViewColumns(this.rowHandlers, this.firstRowId)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  getCurrentData() {
    return toJS(this.supplierSearchRequestsVacant)
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  setDataGridState(state) {
    this.firstRowId = state.sorting.sortedRows[0]
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getSupplierSearchRequestsVacant()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getSupplierSearchRequestsVacant() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined

      const result = await IdeaModel.getSupplierSearchRequests()
      runInAction(() => {
        this.supplierSearchRequestsVacant = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISO('checkedAt')),
        )
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)

      this.supplierSearchRequestsVacant = []
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
          pathname: '/buyer/search-supplier-by-client/product',
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
