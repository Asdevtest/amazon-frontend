import axios from 'axios'
import { compareVersions } from 'compare-versions'
import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { appVersion } from '@constants/app-version'
import { LOCAL_STORAGE_KEYS } from '@constants/keys/local-storage'
import { snackNoticeKey } from '@constants/keys/snack-notifications'

import { setI18nConfig } from '@utils/translations'

import { LanguageKey } from '@typings/enums/language-key'
import { UiTheme } from '@typings/enums/ui-theme'

const persistProperties = [
  'dataGridState',
  'activeSubCategoryState',
  'viewTableModeState',
  'languageTag',
  'chatMessageState',
  'uiTheme',
  'destinationsFavourites',
  'isMuteChats',
  'mutedChats',
  'originMutedChats',
]

class SettingsModelStatic {
  dataGridState = {}
  activeSubCategoryState = {}
  viewTableModeState = {}
  chatMessageState = undefined

  languageTag = LanguageKey.en
  uiTheme = UiTheme.light
  isHydrated = false
  breadcrumbsForProfile = null

  isMuteChats = false
  mutedChats = []
  originMutedChats = []

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
    makePersistable(this, { name: LOCAL_STORAGE_KEYS.SETTINGS_MODEL, properties: persistProperties })
      .then(({ isHydrated }) => {
        runInAction(() => {
          this.isHydrated = isHydrated
        })
      })
      .catch(error => console.error(error))
    reaction(
      () => this.isHydrated,

      isHydrated => {
        if (isHydrated) {
          setI18nConfig()
        }
      },
    )

    this.setIntervalCheckAppVersion()
  }

  loadValue(key) {
    const value = localStorage.getItem(key)
    return value !== null ? JSON.parse(value) : null
  }

  saveValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  onToggleMuteCurrentChat(chatId, chats) {
    this.setMutedChat(chatId, chats)
  }

  onToggleMuteAllChats(chats) {
    this.setMutedChats(chats)
    this.isMuteChats = !this.isMuteChats
  }

  setMutedChat(chatId, chats) {
    if (this.mutedChats.includes(chatId)) {
      const filteredChats = this.mutedChats.filter(currentChatId => currentChatId !== chatId)
      this.originMutedChats = filteredChats
      this.mutedChats = filteredChats
    } else {
      this.originMutedChats.push(chatId)
      this.mutedChats.push(chatId)
    }

    this.isMuteChats = chats.length === this.mutedChats.length
  }

  setMutedChats(chats) {
    if (this.isMuteChats) {
      this.mutedChats = this.originMutedChats
    } else {
      this.mutedChats = chats.map(chat => chat._id)
    }
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
      console.warn('!!!*** versions do not match')

      this.resetLocalStorageAndCach()
    }

    console.warn('!!!*** versions do match')
  }

  resetLocalStorageAndCach() {
    for (const key of Object.values(LOCAL_STORAGE_KEYS)) {
      localStorage.removeItem(key)
    }

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

  changeLastCrumbAdditionalText(text) {
    this.lastCrumbAdditionalText = text
  }

  setDestinationsFavouritesItem(item) {
    const findDestinationsFavouritesItemIndex = this.destinationsFavourites.findIndex(
      destinationsFavouritesItem => destinationsFavouritesItem[0] === item[0],
    )

    if (findDestinationsFavouritesItemIndex !== -1) {
      this.destinationsFavourites = this.destinationsFavourites.filter(destination => destination[0] !== item[0])
    } else {
      this.destinationsFavourites = [...this.destinationsFavourites, item]
    }
  }

  setIntervalCheckAppVersion() {
    setTimeout(() => {
      this.checkAppVersion()
    }, 30000)

    setInterval(() => {
      this.checkAppVersion()
    }, 300000)
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

  setAuthorizationData(accessToken, refreshToken) {
    const userModel = this.loadValue('UserModel')
    this.saveValue('UserModel', { ...userModel, accessToken, refreshToken })
  }
}

export const SettingsModel = new SettingsModelStatic()
