import { makeAutoObservable, runInAction } from 'mobx'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ViewTableModeStateKeys } from '@constants/table/view-table-mode-state-keys'

import { SettingsModel } from '@models/settings-model'
import { ShopSellModel } from '@models/shop-sell-model'
import { UserModel } from '@models/user-model'

export class ClientSellShopsAdsModel {
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
    SOLD_ADS: 'SOLD_ADS',
    PURCHASED_ADS: 'PURCHASED_ADS',
  }

  curFilter = this.filtersSettings.ALL_ADS

  get user() {
    return UserModel.userInfo
  }

  get currentData() {
    return this.shopSellsData
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

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  onClickFilterBtn(filter) {
    this.curFilter = filter
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
        this.shopSellsData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickAddBtn() {
    this.history.push('/client/trading-shops/sell-shops/create-trading-traiding-shop')
  }

  onClickViewMore(id) {
    this.history.push('/client/trading-shops/sell-shops/traiding-shop', { shopSellId: id })
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
}
