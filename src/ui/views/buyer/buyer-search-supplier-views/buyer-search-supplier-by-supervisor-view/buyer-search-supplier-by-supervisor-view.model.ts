import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { DataGridTableModel } from '@models/data-grid-table-model'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { buyerSearchSuppliersViewColumns } from './buyer-seach-suppliers-columns'
import { observerConfig } from './observer-config'

export class BuyerSearchSupplierBySupervisorModel extends DataGridTableModel {
  constructor() {
    const rowHandlers = {
      onPickUp: (row: IProduct) => this.onClickTableRowBtn(row),
    }
    const columnsModel = buyerSearchSuppliersViewColumns(rowHandlers)

    super({
      getMainDataMethod: BuyerModel.getProductsVacant,
      columnsModel,
      tableKey: DataGridTablesKeys.BUYER_SEARCH_SUPPLIER_BY_SUPERVISOR,
    })

    makeObservable(this, observerConfig)
    this.sortModel = [{ field: 'updatedAt', sort: 'asc' }]

    this.getDataGridState()
    this.getCurrentData()
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
        this.history.push({
          pathname: '/buyer/search-supplier-by-supervisor/product',
          search: 'product-id=' + item._id,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
