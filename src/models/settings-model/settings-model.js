import { setI18nConfig } from '@utils/translations'
import {makeAutoObservable, reaction} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

const persistProperties = ['dataGridState', 'activeSubCategoryState', 'languageTag']

const stateModelName = 'SettingsModel'
class SettingsModelStatic {
  dataGridState = {}
  activeSubCategoryState = {}
  languageTag = undefined
  isHydrated = false

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistable(this, {name: stateModelName, properties: persistProperties}).then(({isHydrated}) => {
      this.isHydrated = isHydrated
    })
    reaction(
      () => this.isHydrated,
      (isHydrated) => {
        if (isHydrated) {
          setI18nConfig()
        }
      },
    )
  }

  setDataGridState(state, tableKey) {
    this.dataGridState = {...this.dataGridState, [tableKey]: state}
  }

  setActiveSubCategoryState(state, tableKey) {
    this.activeSubCategoryState = {...this.activeSubCategoryState, [tableKey]: state}
  }

  setLanguageTag(languageKey) {
    this.languageTag = languageKey
  }
}

export const SettingsModel = new SettingsModelStatic()
