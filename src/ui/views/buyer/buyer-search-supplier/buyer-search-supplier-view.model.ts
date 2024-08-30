import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { DataGridTableModel } from '@models/data-grid-table-model'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { buyerSearchSuppliersViewColumns } from './buyer-search-supplier-columns'
import { getQuery } from './helpers/get-query'
import { getTableKey } from './helpers/get-table-key'
import { observerConfig } from './observer-config'

export class BuyerSearchSupplierBySupervisorModel extends DataGridTableModel {
  constructor() {
    const rowHandlers = {
      onPickUp: (row: IProduct) => this.onClickTableRowBtn(row),
    }

    const columnsModel = buyerSearchSuppliersViewColumns(rowHandlers)
    const tableKey = getTableKey(location.pathname)

    const options = getQuery(location.pathname)

    const defaultGetCurrentDataOptions = () => options

    super({
      getMainDataMethod: BuyerModel.getProductsVacant,
      columnsModel,
      tableKey,
      defaultGetCurrentDataOptions,
      defaultSortModel: [{ field: 'updatedAt', sort: 'asc' }],
    })

    makeObservable(this, observerConfig)

    this.initHistory()

    this.getTableSettingsPreset()
  }

  async onPickupSomeItems() {
    try {
      for (let i = 0; i < this.selectedRows.length; i++) {
        const itemId = this.selectedRows[i]

        await this.onClickTableRowBtn({ _id: itemId } as IProduct, true)
      }

      runInAction(() => {
        this.selectedRows = []
      })

      toast.success(t(TranslationKey['Taken to Work']))

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickTableRowBtn(item: IProduct, noPush?: boolean) {
    try {
      await BuyerModel.pickupProduct(item._id)
      this.getCurrentData()

      if (!noPush) {
        this.history.push(`/buyer/my-products/product?product-id=${item._id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
