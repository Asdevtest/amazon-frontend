import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { SettingsModel } from '@models/settings-model'
import { ShopSellModel } from '@models/shop-sell-model'
import { UserModel } from '@models/user-model'

export class ClientBuyShopsAdsModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  nameSearchValue = ''

  drawerOpen = false

  searchMyRequestsIds = []
  shopSellsData = []

  viewMode = tableViewMode.LIST
  sortMode = tableSortMode.DESK

  filtersSettings = {
    ALL_ADS: 'ALL_ADS',
    PURCHASED_ADS: 'PURCHASED_ADS',
  }

  curFilter = this.filtersSettings.ALL_ADS

  get user() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setTableModeState() {
    const state = { viewMode: this.viewMode, sortMode: this.sortMode }

    SettingsModel.setViewTableModeState(state, ViewTableModeStateKeys.VACANT_REQUESTS)
  }

  getTableModeState() {
    const state = SettingsModel.viewTableModeState[ViewTableModeStateKeys.VACANT_REQUESTS]

    if (state) {
      this.viewMode = state.viewMode
      this.sortMode = state.sortMode
    }
  }

  onChangeViewMode(event, nextView) {
    this.viewMode = nextView
    this.setTableModeState()
  }

  onClickFilterBtn(filter) {
    this.curFilter = filter
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.shopSellsData).filter(el => el.title.toLowerCase().includes(this.nameSearchValue.toLowerCase()))
    } else {
      return toJS(this.shopSellsData)
    }
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  async loadData() {
    try {
      await this.getShopSells()
      this.getTableModeState()
    } catch (error) {
      console.log(error)
    }
  }

  async getShopSells() {
    try {
      const result = await ShopSellModel.getShopSells()

      runInAction(() => {
        this.shopSellsData = result.filter(el => el.owner._id !== this.user._id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickViewMore(id) {
    this.history.push('/client/trading-shops/buy-shops/traiding-shop', { shopSellId: id })
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerSortMode() {
    if (this.sortMode === tableSortMode.DESK) {
      this.sortMode = tableSortMode.ASC
    } else {
      this.sortMode = tableSortMode.DESK
    }

    this.setTableModeState()
  }
}
