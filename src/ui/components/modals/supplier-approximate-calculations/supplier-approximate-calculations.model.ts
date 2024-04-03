import { makeObservable, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid-premium'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { SortSettingsMode } from '@components/data-grid/data-grid-custom-components/sort-settings/sort-settings.type'
import { ISwitcherSettings } from '@components/shared/custom-switcher/custom-switcher'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { observerConfig } from './observer-config'
import { SupplierApproximateCalculationsColumns } from './supplier-approximate-calculations-columns'
import { additionalFilterFields } from './supplier-approximate-calculations.constants'

export class SupplierApproximateCalculationsModel extends DataGridFilterTableModel {
  _storekeepers: ISwitcherSettings[] = []
  get storekeepers() {
    return this._storekeepers
  }
  set storekeepers(storekeepers: ISwitcherSettings[]) {
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
    const columns = SupplierApproximateCalculationsColumns() as GridColDef[]

    const productId = new URL(window.location.href).searchParams.get('product-id') || ''

    const defaultGetDataMethodOptions = () => ({
      guid: productId,
      supplierId,
    })

    super(
      StorekeeperModel.getStorekeepersTariffsWithCalculations,
      columns,
      getFilterFields(columns, additionalFilterFields),
      `storekeepers/tariffs_with_calculations/${productId}?`,
      undefined,
      undefined,
      defaultGetDataMethodOptions,
    )

    this.sortModel = [{ field: 'roi', sort: SortSettingsMode.DESC }]

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

        this.setCurrentStorekeeper(this.storekeepers[0]?.value as string)
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

  onClickResetFilters() {
    this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)
    this.onChangeFullFieldMenuItem([this.storekeepers[0]?.value], 'storekeeper')
    this.getMainTableData()
  }
}
