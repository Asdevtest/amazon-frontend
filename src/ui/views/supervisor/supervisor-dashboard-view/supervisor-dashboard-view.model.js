import {makeAutoObservable, runInAction} from 'mobx'

import {SupervisorDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {OtherModel} from '@models/other-model'
import {SupervisorModel} from '@models/supervisor-model'
import {UserModel} from '@models/user-model'

import {toFixed} from '@utils/text'

export class SupervisorDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  drawerOpen = false

  productsVacant = []
  producatsMy = []
  paymentsMy = []

  dashboardData = {
    [SupervisorDashboardCardDataKey.ALL_PRODUCTS]: '',
    [SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS]: '',
    [SupervisorDashboardCardDataKey.PAYED_PRODUCTS]: '',

    [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER]: '',
    [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: '',
    [SupervisorDashboardCardDataKey.ON_CHECKING]: '',
    [SupervisorDashboardCardDataKey.AWAIT_SOLVE]: '',

    [SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS]: '',
    [SupervisorDashboardCardDataKey.REJECTED_PRODUCTS]: '',

    [SupervisorDashboardCardDataKey.REPLENISH]: '',
    [SupervisorDashboardCardDataKey.FINES]: '',
  }
  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getProductsMy() {
    try {
      const result = await SupervisorModel.getProductsMy()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [SupervisorDashboardCardDataKey.ALL_PRODUCTS]: result.length,
          [SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS]: result.filter(el =>
            [ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]].includes(el.status),
          ).length,

          [SupervisorDashboardCardDataKey.PAYED_PRODUCTS]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
            ].includes(el.status),
          ).length,

          [SupervisorDashboardCardDataKey.ON_CHECKING]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
              ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER],
            ].includes(el.status),
          ).length,

          [SupervisorDashboardCardDataKey.AWAIT_SOLVE]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
              ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER],
              ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR],

              ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
              ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER],

              ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
            ].includes(el.status),
          ).length,

          [SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
              ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
              // ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
              // ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
              // ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],

              ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT],
              // ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER],
              // ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
              // ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
            ].includes(el.status),
          ).length,

          [SupervisorDashboardCardDataKey.REJECTED_PRODUCTS]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND],
              ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
              ProductStatusByKey[ProductStatus.NO_PUBLISHED],

              ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
            ].includes(el.status),
          ).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsVacantByResearcher() {
    try {
      const resultAtSupervisor = await SupervisorModel.getProductsVacant()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER]: resultAtSupervisor.length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsVacantByClient() {
    try {
      const searchAtClient = true
      const resultAtClient = await SupervisorModel.getProductsVacant(searchAtClient)
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: resultAtClient.length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getPayments() {
    try {
      const result = await OtherModel.getMyPayments()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [SupervisorDashboardCardDataKey.REPLENISH]: toFixed(
            result.filter(el => el.sum > 0).reduce((ac, cur) => (ac += cur.sum), 0),
            2,
          ),
          [SupervisorDashboardCardDataKey.FINES]: toFixed(
            result.filter(el => el.paymentType === 'FINE').reduce((ac, cur) => (ac += cur.sum), 0),
            2,
          ),
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      this.getProductsVacantByResearcher()
      this.getProductsVacantByClient()

      this.getProductsMy()
      this.getPayments()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, {dataGridFilter})
    } else {
      this.history.push(route)
    }
  }

  async getProductsVacant() {
    try {
      const result = await SupervisorModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result.filter(el => el.icomment !== '')
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
