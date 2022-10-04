import {makeAutoObservable, reaction} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {UiTheme} from '@constants/themes'
import {LanguageKey} from '@constants/translations/language-key'

import {setI18nConfig} from '@utils/translations'

const persistProperties = [
  'dataGridState',
  'activeSubCategoryState',
  'viewTableModeState',
  'languageTag',
  'chatMessageState',
  'uiTheme',
]

const stateModelName = 'SettingsModel'
class SettingsModelStatic {
  dataGridState = {}
  activeSubCategoryState = {}
  viewTableModeState = {}
  chatMessageState = undefined

  languageTag = LanguageKey.en
  uiTheme = UiTheme.light
  isHydrated = false

  showHints = true
  noticeOfSimpleChats = true

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

  onTriggerNoticeOfSimpleChats() {
    this.noticeOfSimpleChats = !this.noticeOfSimpleChats
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

  setChatMessageState(state, tableKey) {
    this.chatMessageState = {...this.chatMessageState, [tableKey]: state}
  }

  setLanguageTag(languageKey) {
    this.languageTag = languageKey
  }

  setUiTheme(theme) {
    this.uiTheme = theme
  }
}

export const SettingsModel = new SettingsModelStatic()
