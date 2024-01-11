import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SupervisorModel } from '@models/supervisor-model'

import { depersonalizedPickColumns } from '@components/table/table-columns/depersonalized-pick-columns'

import { depersonalizedPickDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class SupervisorReadyToCheckForIdeaViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  showInfoModal = false

  selectedRowIds = []

  productsReadyToCheck = []

  isSupervisor = true

  get currentData() {
    return toJS(this.productsReadyToCheck)
  }

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }

  columnsModel = depersonalizedPickColumns(this.rowHandlers, this.isSupervisor)
  columnVisibilityModel = {}

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
  }

  async loadData() {
    try {
      await this.getProductsReadyToCheck()
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsReadyToCheck() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const isCreatedByClient = true

      const result = await SupervisorModel.getProductsVacant(isCreatedByClient)

      runInAction(() => {
        this.productsReadyToCheck = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')),
        )
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)

      runInAction(() => {
        this.productsReadyToCheck = []
      })
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
    }
  }

  async onClickTableRowBtn(item, noPush) {
    try {
      await SupervisorModel.pickupProduct(item._id)

      if (!noPush) {
        this.history.push({
          pathname: '/supervisor/ready-to-check-by-client/product',
          search: 'product-id=' + item._id,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
