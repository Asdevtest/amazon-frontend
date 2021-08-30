import {makeAutoObservable} from 'mobx'

import {makePersistableModel} from '@utils/make-persistable-model'

const persistProperties = ['dataGridState']

class SettingsModelStatic {
  dataGridState = {}

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistableModel(this, {properties: persistProperties})
  }

  setDataGridState(state, tableKey) {
    this.dataGridState = {...this.dataGridState, [tableKey]: state}
  }
}

export const SettingsModel = new SettingsModelStatic()
