import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { SupervisorModel } from '@models/supervisor-model'
import { TableSettingsModel } from '@models/table-settings'

import { depersonalizedPickColumns } from '@components/table/table-columns/depersonalized-pick-columns'

import { depersonalizedPickDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class SupervisorReadyToCheckByClientViewModel {
  history = undefined
  requestStatus = undefined

  selectedRowIds = []

  get currentData() {
    return this.productsReadyToCheck
  }

  productsReadyToCheck = []

  isSupervisor = true

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }

  columnVisibilityModel = {}

  columnsModel = depersonalizedPickColumns(this.rowHandlers, this.isSupervisor)

  paginationModel = { page: 0, pageSize: 15 }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  async loadData() {
    try {
      this.getDataGridState()

      await this.getProductsReadyToCheck()
    } catch (error) {
      console.error(error)
    }
  }

  async getProductsReadyToCheck() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const isCreatedByClient = true

      const result = await SupervisorModel.getProductsVacant(isCreatedByClient)

      runInAction(() => {
        this.productsReadyToCheck = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt')),
        )
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)

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

      toast.success(t(TranslationKey['Taken to Work']))

      this.loadData()
    } catch (error) {
      console.error(error)
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
      console.error(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }
}
