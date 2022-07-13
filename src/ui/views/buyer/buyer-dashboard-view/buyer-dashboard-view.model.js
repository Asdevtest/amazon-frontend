import {makeAutoObservable, runInAction} from 'mobx'

import {BuyerDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {BuyerModel} from '@models/buyer-model'
import {OtherModel} from '@models/other-model'
import {UserModel} from '@models/user-model'

import {toFixed} from '@utils/text'

export class BuyerDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  drawerOpen = false
  balance = UserModel.userInfo?.balance

  dashboardData = {
    [BuyerDashboardCardDataKey.ALL_PRODUCTS]: '',
    [BuyerDashboardCardDataKey.SUCCESS_PRODUCTS]: '',
    [BuyerDashboardCardDataKey.PAYED_PRODUCTS]: '',

    [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR]: '',
    [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: '',
    [BuyerDashboardCardDataKey.IN_SEARCH_PRODUCTS]: '',
    [BuyerDashboardCardDataKey.REJECTED_PRODUCTS]: '',

    [BuyerDashboardCardDataKey.IN_PROCESS_ORDERS]: '',
    [BuyerDashboardCardDataKey.FREE_ORDERS]: '',
    [BuyerDashboardCardDataKey.CLOSED_ORDERS]: '',

    [BuyerDashboardCardDataKey.REPLENISH]: '',
    [BuyerDashboardCardDataKey.FINES]: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProductsVacantBySup()
      this.getProductsVacantByClient()
      this.getProductsMy()
      this.getOrdersMy()
      this.getOrdersVacant()
      this.getPayments()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }

  async getPayments() {
    try {
      const result = await OtherModel.getMyPayments()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [BuyerDashboardCardDataKey.REPLENISH]: toFixed(
            result.filter(el => el.sum > 0).reduce((ac, cur) => (ac += cur.sum), 0),
            2,
          ),
          [BuyerDashboardCardDataKey.FINES]: toFixed(
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

  async getProductsVacantBySup() {
    try {
      const resultAtSupervisor = await BuyerModel.getProductsVacant()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR]: resultAtSupervisor.length,
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
      const resultAtClient = await BuyerModel.getProductsVacant(searchAtClient)
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: resultAtClient.length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsMy() {
    try {
      const result = await BuyerModel.getProductsMy()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [BuyerDashboardCardDataKey.ALL_PRODUCTS]: result.length,
          [BuyerDashboardCardDataKey.SUCCESS_PRODUCTS]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
            ].includes(el.status),
          ).length,

          [BuyerDashboardCardDataKey.PAYED_PRODUCTS]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
            ].includes(el.status),
          ).length,

          [BuyerDashboardCardDataKey.IN_SEARCH_PRODUCTS]: result.filter(el =>
            [
              ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
              ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
              ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
              ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
              ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],

              ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
              ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
            ].includes(el.status),
          ).length,

          [BuyerDashboardCardDataKey.REJECTED_PRODUCTS]: result.filter(el =>
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

  async getOrdersMy() {
    try {
      const result = await BuyerModel.getOrdersMy()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [BuyerDashboardCardDataKey.IN_PROCESS_ORDERS]: result.filter(el =>
            [
              OrderStatusByKey[OrderStatus.AT_PROCESS],
              OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
              OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
              OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
              OrderStatusByKey[OrderStatus.IN_STOCK],
            ].includes(el.status),
          ).length,

          [BuyerDashboardCardDataKey.CLOSED_ORDERS]: result.filter(el =>
            [OrderStatusByKey[OrderStatus.ORDER_CLOSED]].includes(el.status),
          ).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getOrdersVacant() {
    try {
      const result = await BuyerModel.getOrdersVacant()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,

          [BuyerDashboardCardDataKey.FREE_ORDERS]: result.filter(el =>
            [OrderStatusByKey[OrderStatus.READY_TO_PROCESS]].includes(el.status),
          ).length,
        }
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
