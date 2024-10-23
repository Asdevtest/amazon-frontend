import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { BuyerModel } from '@models/buyer-model'
import { DataGridTagsFilter } from '@models/data-grid-tags-filter'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IProduct } from '@typings/models/products/product'
import { ITag } from '@typings/shared/tag'

import { buyerProductsViewColumns } from './buyer-products-columns'
import { observerConfig } from './observer-config'

export class BuyerMyProductsViewModel extends DataGridTagsFilter {
  productCardModal = false

  get userInfo() {
    return UserModel.userInfo
  }

  constructor() {
    const rowHandlers = {
      onClickShowProduct: (row: IProduct) => this.onClickTableRow(row),
      onClickTag: (tag: ITag) => this.setActiveProductsTagFromTable(tag),
    }

    const columnsModel = buyerProductsViewColumns(rowHandlers)

    super({
      getMainDataMethod: BuyerModel.getProductsMyPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['amazonTitle', 'skuByClient']),
      mainMethodURL: 'buyers/products/pag/my?',
      fieldsForSearch: ['asin', 'amazonTitle', 'skuByClient'],
      tableKey: DataGridTablesKeys.BUYER_PRODUCTS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.initHistory()
    this.getTableSettingsPreset()
  }

  onClickTableRow(row: IProduct) {
    window?.open(`${window.location.origin}/buyer/my-products/product?product-id=${row._id}`, '_blank')?.focus()
  }

  onClickProductModal(row: IProduct) {
    if (row) {
      this.history.push(`/buyer/my-products?product-id=${row._id}`)
    } else {
      this.history.push(`/buyer/my-products`)
    }

    this.onTriggerOpenModal('productCardModal')
  }

  onClickShowProduct(id: string) {
    window?.open(`/buyer/my-products/product?product-id=${id}`, '_blank')?.focus()
  }
}
