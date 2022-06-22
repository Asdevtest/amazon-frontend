import {makeAutoObservable, reaction} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {LanguageKey} from '@constants/translations/language-key'

import {setI18nConfig} from '@utils/translations'

const persistProperties = ['dataGridState', 'activeSubCategoryState', 'viewTableModeState', 'languageTag']

const stateModelName = 'SettingsModel'
class SettingsModelStatic {
  dataGridState = {}
  activeSubCategoryState = {}
  viewTableModeState = {}
  languageTag = LanguageKey.en
  isHydrated = false

  showHints = false

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistable(this, {name: stateModelName, properties: persistProperties}).then(({isHydrated}) => {
      this.isHydrated = isHydrated
    })
    reaction(
      () => this.isHydrated,

      isHydrated => {
        if (isHydrated) {
          setI18nConfig()
        }
      },
    )
  }

  onTriggerShowHints() {
    this.showHints = !this.showHints
  }

  setDataGridState(state, tableKey) {
    this.dataGridState = {...this.dataGridState, [tableKey]: state}
  }

  setActiveSubCategoryState(state, tableKey) {
    this.activeSubCategoryState = {...this.activeSubCategoryState, [tableKey]: state}
  }

  setViewTableModeState(state, tableKey) {
    this.viewTableModeState = {...this.viewTableModeState, [tableKey]: state}
  }

  setLanguageTag(languageKey) {
    this.languageTag = languageKey
  }
}

export const SettingsModel = new SettingsModelStatic()
