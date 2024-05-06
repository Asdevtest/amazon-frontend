import { makeObservable, runInAction } from 'mobx'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IBatch } from '@typings/models/batches/batch'
import { IProduct } from '@typings/models/products/product'

import { productBatchesColumns } from './product-batches-columns'
import { productBoxesColumns } from './product-boxes-columns'
import { productDataFormConfig } from './product-data-form.config'
import { searchFields } from './product-data-form.constants'

export class ProductDataFormModel extends DataGridFilterTableModel {
  batch?: IBatch = undefined
  batchArchive = false
  showBatchInfoModal = false

  get rows() {
    return this.tableData
  }

  constructor({ product, isBatches, onAmazon }: { product: IProduct; isBatches: boolean; onAmazon: boolean }) {
    const columnHandlers = {
      onClickChangeVariation: (id: string) => this.onClickShowBatchInfoModal(id),
    }
    const columns = isBatches ? productBatchesColumns(columnHandlers) : productBoxesColumns(columnHandlers)
    const defaultGetDataMethodOptions = () => ({
      guid: product._id,
      onAmazon,
      batchArchive: this.batchArchive,
    })

    super({
      getMainDataMethod: isBatches ? BatchesModel.getBatchesbyProduct : BoxesModel.getProductInBatch,
      columnsModel: columns,
      filtersFields: getFilterFields(columns, ['batchArchive']),
      mainMethodURL: isBatches
        ? `batches/by_product/${product._id}?`
        : `boxes/clients/product_in_batch/${product._id}?onAmazon=${onAmazon}&`,
      fieldsForSearch: searchFields,
      defaultGetDataMethodOptions,
    })
    this.sortModel = [{ field: 'humanFriendlyId', sort: 'desc' }]
    this.onChangeFullFieldMenuItem([false], 'batchArchive')
    this.getMainTableData()

    makeObservable(this, productDataFormConfig)
  }

  async onClickShowBatchInfoModal(id: string) {
    try {
      const response = await BatchesModel.getBatchesByGuid(id)

      runInAction(() => (this.batch = response as unknown as IBatch))

      this.onTriggerOpenModal('showBatchInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  onToggleArchive() {
    this.batchArchive = !this.batchArchive
    this.onChangeFullFieldMenuItem([this.batchArchive], 'batchArchive')
    this.getMainTableData()
  }

  async patchActualShippingCostBatch(id: string, cost: number) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost || '0',
    })
  }
}
