import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { SupervisorModel } from '@models/supervisor-model'

import { depersonalizedPickColumns } from '@components/table/table-columns/depersonalized-pick-columns'

import { depersonalizedPickDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class SupervisorReadyToCheckForIdeaViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

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
          result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')),
        )
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)

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
}
