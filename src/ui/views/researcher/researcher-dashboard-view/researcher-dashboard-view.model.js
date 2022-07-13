import {makeAutoObservable, runInAction} from 'mobx'

import {ResearcherDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {OtherModel} from '@models/other-model'
import {ResearcherModel} from '@models/researcher-model'
import {UserModel} from '@models/user-model'

import {toFixed} from '@utils/text'

export class ResearcherDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  productsVacant = []
  paymentsMy = []

  dashboardData = {
    [ResearcherDashboardCardDataKey.ALL_PRODUCTS]: '',
    [ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS]: '',

    [ResearcherDashboardCardDataKey.REJECTED_PRODUCTS]: '',
    [ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING]: '',
    [ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER]: '',
    [ResearcherDashboardCardDataKey.NO_STATUS]: '',

    [ResearcherDashboardCardDataKey.REPLENISH]: '',
    [ResearcherDashboardCardDataKey.FINES]: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getProductsVacant() {
    const result = await ResearcherModel.getProductsVacant()
    runInAction(() => {
      this.dashboardData = {
        ...this.dashboardData,
        [ResearcherDashboardCardDataKey.ALL_PRODUCTS]: result.length,

        [ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS]: result.filter(el =>
          [ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]].includes(el.status),
        ).length,

        [ResearcherDashboardCardDataKey.REJECTED_PRODUCTS]: result.filter(el =>
          [
            ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
            ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
          ].includes(el.status),
        ).length,

        [ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING]: result.filter(el =>
          [ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT]].includes(el.status),
        ).length,

        [ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER]: result.filter(el =>
          [
            ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
            ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
            ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
          ].includes(el.status),
        ).length,

        [ResearcherDashboardCardDataKey.NO_STATUS]: result.filter(el =>
          [ProductStatusByKey[ProductStatus.NEW_PRODUCT]].includes(el.status),
        ).length,
      }
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsVacant()

      this.getPayments()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getPayments() {
    try {
      const result = await OtherModel.getMyPayments()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ResearcherDashboardCardDataKey.REPLENISH]: toFixed(
            result.filter(el => el.sum > 0).reduce((ac, cur) => (ac += cur.sum), 0),
            2,
          ),
          [ResearcherDashboardCardDataKey.FINES]: toFixed(
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

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
