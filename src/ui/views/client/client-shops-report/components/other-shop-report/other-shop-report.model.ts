import { makeAutoObservable } from 'mobx'

import { DataGridTableModel } from '@models/data-grid-table-model/data-grid-table-model'

import { IListOfModals } from '@typings/data-grid'

export class OtherShopModel extends DataGridTableModel {
  constructor(history?: History, listOfModals?: IListOfModals, tableKey?: string) {
    super(history, listOfModals, tableKey)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  // loadData() {

  // }
}
