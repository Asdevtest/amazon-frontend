import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {ViewTableModeStateKeys} from '@constants/view-table-mode-state-keys'

import {SettingsModel} from '@models/settings-model'
import {ShopSellModel} from '@models/shop-sell-model'
import {UserModel} from '@models/user-model'

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

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setTableModeState() {
    const state = {viewMode: this.viewMode, sortMode: this.sortMode}

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
        this.shopSellsData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickAddBtn() {
    this.history.push('/client/trading-shops/sell-shops/create-trading-shop')
  }

  onClickViewMore(id) {
    this.history.push('/client/trading-shops/sell-shops/shop', {shopSellId: id})
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
