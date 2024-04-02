import { makeObservable, runInAction } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { observerConfig } from './observer-config'
import { SupplierApproximateCalculationsColumns } from './supplier-approximate-calculations-columns'
import { additionalFilterFields } from './supplier-approximate-calculations.constants'

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

  constructor(supplierId: string) {
    const columns = SupplierApproximateCalculationsColumns()

    const productId = new URL(window.location.href).searchParams.get('product-id') || ''

    const defaultGetDataMethodOptions = () => ({
      guid: productId,
      supplierId,
    })

    super(
      StorekeeperModel.getStorekeepersTariffsWithCalculations,
      columns,
      getFilterFields(columns, additionalFilterFields),
      `storekeepers/tariffs_with_calculations/${productId}`,
      undefined,
      undefined,
      defaultGetDataMethodOptions,
    )

    this.getStorekeepersData()

    makeObservable(this, observerConfig)
  }

  async getStorekeepersData() {
    try {
      const result = await StorekeeperModel.getStorekeepers({ withoutTariffs: true })

      runInAction(() => {
        this.storekeepers = result
          // @ts-ignore
          .sort((a, b) => a?.name?.localeCompare(b?.name))
          .map(storekeeper => ({
            label: () => storekeeper.name || '',
            value: storekeeper._id,
          }))

        this.setCurrentStorekeeper(this.storekeepers[0]?.value)
      })
    } catch (error) {
      console.log('error :>> ', error)
    }
  }

  async setCurrentStorekeeper(storekeeperId: string) {
    this.currentStorekeeperId = storekeeperId
    this.onChangeFullFieldMenuItem([storekeeperId], 'storekeeper')
    this.getMainTableData()
  }
}
