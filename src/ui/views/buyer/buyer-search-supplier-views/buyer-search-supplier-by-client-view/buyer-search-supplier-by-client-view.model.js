import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class BuyerSearchSupplierByClientModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  balance = UserModel.userInfo?.balance
  productsVacant = []

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProductsVacant()
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

      const isCreatedByClient = true

      const result = await BuyerModel.getProductsVacant(isCreatedByClient)
      runInAction(() => {
        this.productsVacant = result.sort(sortObjectsArrayByFiledDate('checkedAt'))
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
