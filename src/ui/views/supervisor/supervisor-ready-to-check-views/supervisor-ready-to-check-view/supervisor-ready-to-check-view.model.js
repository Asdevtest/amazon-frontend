import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SettingsModel } from '@models/settings-model'
import { SupervisorModel } from '@models/supervisor-model'

import { depersonalizedPickColumns } from '@components/table/table-columns/depersonalized-pick-columns'

import { depersonalizedPickDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'

export class SupervisorReadyToCheckViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  showInfoModal = false

  selectedRowIds = []

  productsReadyToCheck = []
  isSupervisor = true

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }

  columnsModel = depersonalizedPickColumns(this.rowHandlers, this.isSupervisor)

  columnVisibilityModel = {}

  paginationModel = { page: 0, pageSize: 15 }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
      this.getDataGridState()
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
  }

  getCurrentData() {
    return toJS(this.productsReadyToCheck)
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
      })
      await this.getProductsReadyToCheck()
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

  async getProductsReadyToCheck() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await SupervisorModel.getProductsVacant()

      this.setRequestStatus(loadingStatuses.success)
      runInAction(() => {
        this.productsReadyToCheck = depersonalizedPickDataConverter(
          result
            .filter(el => el.status !== ProductStatusByKey[ProductStatus.NEW_PRODUCT])
            .sort(sortObjectsArrayByFiledDateWithParseISOAsc('createdAt')),
        )
      })
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)

      runInAction(() => {
        this.productsReadyToCheck = []
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
      await SupervisorModel.pickupProduct(item._id)

      if (!noPush) {
        this.history.push({
          pathname: '/supervisor/ready-to-check/product',
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

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }
}
