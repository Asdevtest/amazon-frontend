/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'

import { addIdDataConverter } from '@utils/data-grid-data-converters'

import { getClassParams } from './helpers/get-class-params'
import { tabsValues } from './helpers/tabs-value'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  _tabKey = tabsValues.STOCK_REPORT

  get tabKey() {
    return this._tabKey
  }

  constructor(currentTabsValues: tabsValues) {
    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL } = getClassParams(currentTabsValues)

    super(getMainDataMethod, columnsModel(), filtersFields, mainMethodURL)
    makeObservable(this, {})

    this.getMainTableData()
  }

  changeTabHandler = (key: tabsValues) => {
    this._tabKey = key

    const { getMainDataMethod, columnsModel } = getClassParams(key)

    this.getMainDataMethod = getMainDataMethod
    this.columnsModel = columnsModel()

    this.getMainTableData()
  }
}
