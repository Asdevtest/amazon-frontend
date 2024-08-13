import { makeObservable } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { observerConfig } from './observer-config'

export class ParsingReportsModel extends DataGridFilterTableModel {
  constructor() {
    super({})

    makeObservable(this, observerConfig)
  }
}
