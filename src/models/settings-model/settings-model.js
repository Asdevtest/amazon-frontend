import {makeAutoObservable} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

const persistProperties = ['dataGridState', 'activeSubCategoryState']

const stateModelName = 'SettingsModel'
class SettingsModelStatic {
  dataGridState = {}
  activeSubCategoryState = {}

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistable(this, {name: stateModelName, properties: persistProperties})
  }

  setDataGridState(state, tableKey) {
    this.dataGridState = {...this.dataGridState, [tableKey]: state}
  }

  setActiveSubCategoryState(state, tableKey) {
    this.activeSubCategoryState = {...this.activeSubCategoryState, [tableKey]: state}
  }
}

export const SettingsModel = new SettingsModelStatic()
