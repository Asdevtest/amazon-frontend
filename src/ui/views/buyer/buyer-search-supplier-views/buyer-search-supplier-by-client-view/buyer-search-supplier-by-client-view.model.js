import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'

import { buyerSearchSuppliersViewColumns } from '@components/table/table-columns/buyer/buyer-seach-suppliers-columns'

import { depersonalizedPickDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class BuyerSearchSupplierByClientModel {
  history = undefined
  requestStatus = undefined
  productsVacant = []
  selectedRowIds = []

  rowHandlers = {
    onPickUp: row => this.onClickTableRowBtn(row),
  }
  paginationModel = { page: 0, pageSize: 15 }
  columnsModel = buyerSearchSuppliersViewColumns(this.rowHandlers)
  columnVisibilityModel = {}

  get currentData() {
    return this.productsVacant
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })

    this.getProductsVacant()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
  }

  async getProductsVacant() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await BuyerModel.getProductsVacant(true)

      runInAction(() => {
        this.productsVacant = depersonalizedPickDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt')),
        )
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
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

      toast.success(t(TranslationKey['Taken to Work']))

      this.getProductsVacant()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickTableRowBtn(item, noPush) {
    try {
      await BuyerModel.pickupProduct(item._id)

      if (!noPush) {
        this.history.push(`/buyer/search-supplier-by-client/product?product-id=${item._id}`)
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
