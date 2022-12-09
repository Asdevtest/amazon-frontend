import axios from 'axios'
import isEqual from 'lodash.isequal'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {appVersion} from '@constants/app-version'
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
  'destinationsFavourites',
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
  breadcrumbsForProfile = null
  showHints = true
  noticeOfSimpleChats = true

  destinationsFavourites = []

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistable(this, {name: stateModelName, properties: persistProperties})
      .then(({isHydrated}) => {
        runInAction(() => {
          this.isHydrated = isHydrated
        })
      })
      .catch(error => console.log(error))
    reaction(
      () => this.isHydrated,

      isHydrated => {
        if (isHydrated) {
          setI18nConfig()
        }
      },

      this.setIntervalCheckAppVersion(),
    )
  }

  async checkAppVersion() {
    const response = await axios({
      method: 'get',
      url: `${window.location.origin}/manifest.json`,
      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    if (appVersion !== response.data.version) {
      console.log('!!!*** versions do not match')
      window.location.reload()
    }
  }

  setDestinationsFavouritesItem(item) {
    console.log('setDestinationsFavouritesItem')
    const findDestinationsFavouritesItemIndex = this.destinationsFavourites.findIndex(destinationsFavouritesItem =>
      isEqual(destinationsFavouritesItem, item),
    )
    if (findDestinationsFavouritesItemIndex !== -1) {
      this.destinationsFavourites.splice(findDestinationsFavouritesItemIndex, 1)
    } else {
      this.destinationsFavourites.push(item)
    }
    console.log('this.destinationsFavourites ', toJS(this.destinationsFavourites))
  }

  setIntervalCheckAppVersion() {
    setTimeout(async () => {
      this.checkAppVersion()
    }, 30000)

    setInterval(async () => {
      this.checkAppVersion()
    }, 300000)
  }

  onTriggerShowHints() {
    this.showHints = !this.showHints
  }

  onTriggerNoticeOfSimpleChats() {
    this.noticeOfSimpleChats = !this.noticeOfSimpleChats
  }

  setDataGridState(state, tableKey) {
    this.dataGridState = {...this.dataGridState, [tableKey]: state}
    console.log('this.dataGridState', this.dataGridState)
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

  setBreadcrumbsForProfile(pathname) {
    this.breadcrumbsForProfile = pathname
  }
}

export const SettingsModel = new SettingsModelStatic()
