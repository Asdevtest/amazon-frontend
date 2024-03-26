import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { BuyerModel } from '@models/buyer-model'
import { IdeaModel } from '@models/ideas-model'

import { buyerSearchSuppliersViewColumns } from '@components/table/table-columns/buyer/buyer-seach-suppliers-columns'

import { depersonalizedPickDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

import { loadingStatus } from '@typings/enums/loading-status'

export class BuyerSearchSupplierForIdeaModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productsVacant = []
  supplierSearchRequestsVacant = []

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
    return toJS(this.supplierSearchRequestsVacant)
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

  onPaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatus.IS_LOADING
      })
      await this.getSupplierSearchRequestsVacant()
      runInAction(() => {
        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatus.FAILED
      })
      console.error(error)
    }
  }

  async getSupplierSearchRequestsVacant() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
        this.error = undefined
      })

      const result = await IdeaModel.getSupplierSearchRequests()
      runInAction(() => {
        this.supplierSearchRequestsVacant = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISO('checkedAt')),
        )
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)

      runInAction(() => {
        this.supplierSearchRequestsVacant = []
      })
      console.error(error)
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
      console.error(error)
    }
  }

  async onClickTableRowBtn(item, noPush) {
    try {
      await BuyerModel.pickupProduct(item._id)

      if (!noPush) {
        this.history.push({
          pathname: '/buyer/search-supplier-by-client/product',
          search: 'product-id=' + item._id,
        })
      }
    } catch (error) {
      console.error(error)
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
