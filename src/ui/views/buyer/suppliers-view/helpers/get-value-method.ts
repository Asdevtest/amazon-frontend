import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { TableView } from '../suppliers-view.type'

export const getValueMethod = (activeTable: TableView) => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return SupplierV2Model?.getSuppliers
    case TableView.CARDS:
      return SupplierV2Model?.getAllSuppliersCards
  }
}
