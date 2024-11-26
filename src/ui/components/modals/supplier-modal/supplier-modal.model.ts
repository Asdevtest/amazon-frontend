import { makeObservable } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { DefaultModel } from '@models/default-model'
import { SupplierModel } from '@models/supplier-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { SuppliersViewModel } from '@views/buyer/suppliers-view/suppliers-view.model'
import { TableView } from '@views/buyer/suppliers-view/suppliers-view.type'

import { observerConfig } from './observer.config'

export class SupplierModalModel extends DefaultModel {
  supplierCardsModel: SuppliersViewModel

  constructor(supplierId: string) {
    const defaultGetCurrentDataOptions = () => supplierId

    super({
      getMainDataMethod: SupplierModel?.getSupplier,
      defaultGetCurrentDataOptions,
    })

    this.supplierCardsModel = new SuppliersViewModel(TableView.CARDS)
    this.supplierCardsModel.getMainDataMethod = SupplierV2Model.getSupplierCards
    this.supplierCardsModel.defaultGetCurrentDataOptions = () => ({
      guid: supplierId,
    })

    makeObservable(this, observerConfig)

    this.getCurrentData()
    this.supplierCardsModel.getCurrentData()
  }
}
