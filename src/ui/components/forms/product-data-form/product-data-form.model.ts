import { makeObservable, runInAction } from 'mobx'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IBatch } from '@typings/models/batches/batch'
import { IProduct } from '@typings/models/products/product'

import { productBatchesColumns } from './product-batches-columns'
import { productBoxesColumns } from './product-boxes-columns'
import { productDataFormConfig, searchFields } from './product-data-form.config'

export class ProductDataFormModel extends DataGridFilterTableModel {
  batch?: IBatch = undefined
  archive = false
  showBatchInfoModal = false

  constructor({ product, isBatches, onAmazon }: { product: IProduct; onAmazon: boolean; isBatches?: boolean }) {
    const columnProps = {
      onClickChangeVariation: (id: string) => this.onClickShowBatchInfoModal(id),
    }
    const columnsModel = isBatches ? productBatchesColumns(columnProps) : productBoxesColumns(columnProps)
    const defaultGetCurrentDataOptions = () => ({
      guid: product._id,
      onAmazon,
      archive: this.archive,
    })
    const filtersFields = getFilterFields(columnsModel, ['archive'])

    super({
      getMainDataMethod: isBatches ? BatchesModel.getBatchesbyProduct : BoxesModel.getProductInBatch,
      columnsModel,
      filtersFields,
      mainMethodURL: isBatches
        ? `batches/by_product/${product._id}?`
        : `boxes/clients/product_in_batch/${product._id}?onAmazon=${onAmazon}&`,
      fieldsForSearch: searchFields,
      defaultGetCurrentDataOptions,
    })

    if (!isBatches) {
      this.handleHideColumns(['logicsTariffCls', 'logicsTariffEtd', 'logicsTariffEta'])
    }
    this.sortModel = [{ field: 'xid', sort: 'desc' }]
    this.pinnedColumns = { right: ['actions'] }
    this.onChangeFullFieldMenuItem([false], 'archive')
    this.getCurrentData()

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
    this.archive = !this.archive
    this.onChangeFullFieldMenuItem([this.archive], 'archive')
    this.getCurrentData()
  }

  async patchActualShippingCostBatch(id: string, cost: number) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost || '0',
    })
  }
}
