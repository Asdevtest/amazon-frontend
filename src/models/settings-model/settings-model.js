import axios from 'axios'
import {compareVersions} from 'compare-versions'
import isEqual from 'lodash.isequal'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {appVersion} from '@constants/app-version'
import {snackNoticeKey} from '@constants/snack-notifications'
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

  snackBarMessageLast = null

  snackNotifications = {
    [snackNoticeKey.SIMPLE_MESSAGE]: null,
    [snackNoticeKey.ORDER_DEADLINE]: null,
    [snackNoticeKey.ORDERS_UPDATES]: null,
    [snackNoticeKey.IDEAS]: null,
  }

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

    const cach = await caches.keys()
    console.log('appVersion', appVersion)
    console.log('response.data.version', response.data.version)

    console.log('caches', caches)
    console.log('cach.keys()', cach)

    // if (appVersion !== response.data.version) {

    console.log(
      'compareVersions(response.data.version, appVersion)',
      compareVersions(response.data.version, appVersion),
    )

    if (compareVersions(response.data.version, appVersion) > 0) {
      console.log('!!!*** versions do not match')

      // if (caches) {
      //   caches.keys().then(names => {
      //     for (const name of names) {
      //       caches.delete(name)
      //     }
      //   })
      // }

      if (cach) {
        cach.forEach(names => {
          for (const name of names) {
            caches.delete(name)
          }
        })
      }

      console.log('!!!*** start reload window')
      window.location.reload()

      // function redirectFunc() {
      //   window.location.href = "https://www.w3docs.com/";
      // }
    }
  }

  setDestinationsFavouritesItem(item) {
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
    setTimeout(() => {
      console.log('!!!*** setTimeout version check')
      this.checkAppVersion()
    }, 30000)

    setInterval(() => {
      console.log('!!!*** setInterval version check')

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

  setSnackNotifications({key, notice}) {
    runInAction(() => {
      this.snackNotifications = {...this.snackNotifications, [key]: notice}
    })
  }
}

export const SettingsModel = new SettingsModelStatic()
