/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'

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

    makeObservable(this, {
      _tabKey: observable,
      tabKey: computed,
      changeTabHandler: action,
    })
  }

  changeTabHandler = (key: tabsValues) => {
    this._tabKey = key

    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL } = getClassParams(key)

    this.getMainDataMethod = getMainDataMethod
    this.columnsModel = columnsModel()
    this.filtersFields = filtersFields
    this.setColumnMenuSettings(filtersFields)
    this.mainMethodURL = mainMethodURL

    this.getMainTableData()
  }
}
