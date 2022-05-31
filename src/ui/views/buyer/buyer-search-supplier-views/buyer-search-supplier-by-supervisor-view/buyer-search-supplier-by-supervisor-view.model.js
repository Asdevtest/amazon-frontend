import {makeAutoObservable, reaction, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {BUYER_PRODUCTS_HEAD_CELLS} from '@constants/table-head-cells'

import {BuyerModel} from '@models/buyer-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class BuyerSearchSupplierBySupervisorModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  balance = UserModel.userInfo?.balance
  productsVacant = []
  productsHead = []

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.loadData(),
    )
  }

  updateProductsHead() {
    this.productsHead = BUYER_PRODUCTS_HEAD_CELLS()
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getProductsVacant()
      this.updateProductsHead()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsVacant() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await BuyerModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result.sort(sortObjectsArrayByFiledDateWithParseISO('checkedAt'))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickTableRowBtn(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await BuyerModel.pickupProduct(product._id)
      this.setActionStatus(loadingStatuses.success)

      this.history.push({
        pathname: '/buyer/product',
        search: product._id,
      })
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
