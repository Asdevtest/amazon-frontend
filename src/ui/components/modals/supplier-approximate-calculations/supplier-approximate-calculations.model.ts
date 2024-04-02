import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { observerConfig } from './observer-config'
import { SupplierApproximateCalculationsColumns } from './supplier-approximate-calculations-columns'

export class SupplierApproximateCalculationsModel extends DataGridFilterTableModel {
  _storekeepers = []
  get storekeepers() {
    return this._storekeepers
  }
  set storekeepers(storekeepers: any) {
    this._storekeepers = storekeepers
  }

  _currentStorekeeperId: string = ''
  get currentStorekeeperId() {
    return this._currentStorekeeperId
  }
  set currentStorekeeperId(currentStorekeeperId: string) {
    this._currentStorekeeperId = currentStorekeeperId
  }

  _productId: string = ''
  get productId() {
    return this._productId
  }
  set productId(productId: string) {
    this._productId = productId
  }

  constructor(productId?: string) {
    super(StorekeeperModel.getStorekeepersTariffsWithCalculations, SupplierApproximateCalculationsColumns(), [], '')

    if (productId) {
      this.productId = productId
    } else {
      const url = new URL(window.location.href)
      this.productId = url.searchParams.get('product-id') || ''
    }

    this.getStorekeepersData()

    makeObservable(this, observerConfig)
  }

  async getStorekeepersData() {
    try {
      const result = await StorekeeperModel.getStorekeepers({ withoutTariffs: true })

      console.log('result :>> ', result)

      runInAction(() => {
        this.storekeepers = result
          // @ts-ignore
          .sort((a, b) => a?.name?.localeCompare(b?.name))
          .map(storekeeper => ({
            label: () => storekeeper.name || '',
            value: storekeeper._id,
          }))
      })
    } catch (error) {
      console.log('error :>> ', error)
    }
  }
}
