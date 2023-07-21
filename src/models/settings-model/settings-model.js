import axios from 'axios'
import { compareVersions } from 'compare-versions'
import isEqual from 'lodash.isequal'
import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { appVersion } from '@constants/app-version'
import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UiTheme } from '@constants/theme/themes'
import { LanguageKey } from '@constants/translations/language-key'

import { setI18nConfig } from '@utils/translations'

const persistProperties = [
  'dataGridState',
  'activeSubCategoryState',
  'viewTableModeState',
  'languageTag',
  'chatMessageState',
  'uiTheme',
  'destinationsFavourites',
  'mutedChats',
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
  mutedChats = []

  lastCrumbAdditionalText = ''

  destinationsFavourites = []

  snackBarMessageLast = null

  snackNotifications = {
    [snackNoticeKey.SIMPLE_MESSAGE]: null,
    [snackNoticeKey.ORDER_DEADLINE]: null,
    [snackNoticeKey.ORDERS_UPDATES]: null,
    [snackNoticeKey.IDEAS]: null,
    [snackNoticeKey.BOXES_UPDATES]: null,
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
    makePersistable(this, { name: stateModelName, properties: persistProperties })
      .then(({ isHydrated }) => {
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

    if (compareVersions(response.data.version, appVersion) > 0) {
      // console.log('!!!*** versions do not match')

      // Очистка локального хранилища
      localStorage.clear()

      // Очистка кэша
      if (window.caches && window.caches.delete) {
        caches.keys().then(names => {
          for (const name of names) {
            caches.delete(name)
          }
        })
      } else {
        // Для старых версий Edge используем следующий способ очистки кэша
        window.location.reload(true)
      }

      window.location.reload()
    }
  }

  changeLastCrumbAdditionalText(text) {
    this.lastCrumbAdditionalText = text
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
    // console.log('this.destinationsFavourites ', toJS(this.destinationsFavourites))
  }

  setIntervalCheckAppVersion() {
    setTimeout(() => {
      // console.log('!!!*** setTimeout version check')
      this.checkAppVersion()
    }, 30000)

    setInterval(() => {
      // console.log('!!!*** setInterval version check')

      this.checkAppVersion()
    }, 300000)
  }

  onTriggerShowHints() {
    this.showHints = !this.showHints
  }

  onTriggerNoticeOfSimpleChats() {
    this.noticeOfSimpleChats = !this.noticeOfSimpleChats
  }

  setMutedChat(chatId) {
    if (this.mutedChats.includes(chatId)) {
      this.mutedChats = this.mutedChats.filter(currentChatId => currentChatId !== chatId)
    } else {
      this.mutedChats.push(chatId)
    }
  }

  setDataGridState(state, tableKey) {
    this.dataGridState = { ...this.dataGridState, [tableKey]: state }
  }

  setActiveSubCategoryState(state, tableKey) {
    this.activeSubCategoryState = { ...this.activeSubCategoryState, [tableKey]: state }
  }

  setViewTableModeState(state, tableKey) {
    this.viewTableModeState = { ...this.viewTableModeState, [tableKey]: state }
  }

  setChatMessageState(state, tableKey) {
    this.chatMessageState = { ...this.chatMessageState, [tableKey]: state }
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

  setSnackNotifications({ key, notice }) {
    runInAction(() => {
      this.snackNotifications = { ...this.snackNotifications, [key]: notice }
    })
  }
}

export const SettingsModel = new SettingsModelStatic()
