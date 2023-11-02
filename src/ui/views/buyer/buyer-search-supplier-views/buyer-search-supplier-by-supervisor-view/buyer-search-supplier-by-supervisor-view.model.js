import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { BuyerModel } from '@models/buyer-model'

import { buyerSearchSuppliersViewColumns } from '@components/table/table-columns/buyer/buyer-seach-suppliers-columns'

import { depersonalizedPickDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'

export class BuyerSearchSupplierBySupervisorModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productsVacant = []

  showInfoModal = false

  selectedRowIds = []

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }

  paginationModel = { page: 0, pageSize: 15 }
  columnsModel = buyerSearchSuppliersViewColumns(this.rowHandlers)
  columnVisibilityModel = {}

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  getCurrentData() {
    return toJS(this.productsVacant)
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
      })
      await this.getProductsVacant()
      // this.updateProductsHead()
      runInAction(() => {
        this.requestStatus = loadingStatuses.success
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
      })
      console.log(error)
    }
  }

  async getProductsVacant() {
    try {
      runInAction(() => {
        this.error = undefined
      })
      const result = await BuyerModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt')),
        )
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.productsVacant = []
      })
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onPickupSomeItems() {
    try {
      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const itemId = this.selectedRowIds[i]

        await this.onClickTableRowBtn({ _id: itemId }, true)
      }

      runInAction(() => {
        this.selectedRowIds = []
      })
      this.onTriggerOpenModal('showInfoModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onClickTableRowBtn(item, noPush) {
    try {
      await BuyerModel.pickupProduct(item._id)

      if (!noPush) {
        this.history.push({
          pathname: '/buyer/search-supplier-by-supervisor/product',
          search: 'product-id=' + item._id,
        })
      }
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }
  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
