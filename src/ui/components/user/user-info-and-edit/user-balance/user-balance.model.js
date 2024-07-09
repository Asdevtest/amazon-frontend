import { makeObservable, runInAction } from 'mobx'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'

import { financesViewColumns } from '@views/shared/finances-view/finances-view.columns'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { loadingStatus } from '@typings/enums/loading-status'

import { userBalanceConfig } from './user-balance.config'

export class UserBalanceModel extends DataGridFilterTableModel {
  user = undefined
  showReplenishModal = false
  showWithdrawModal = false

  constructor(userId) {
    const columnsModel = financesViewColumns()
    const filtersFields = getFilterFields(columnsModel)
    const defaultGetCurrentDataOptions = () => ({
      guid: userId,
    })

    super({
      getMainDataMethod: () => OtherModel.getPaymentsByUserId(userId),
      columnsModel,
      filtersFields,
      defaultGetCurrentDataOptions,
    })

    this.getUserInfo(userId)
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, userBalanceConfig)
  }

  onTriggerReplenishModal() {
    this.showReplenishModal = !this.showReplenishModal
  }

  onTriggerWithdrawModal() {
    this.showWithdrawModal = !this.showWithdrawModal
  }

  async getUserInfo(id) {
    try {
      const response = await AdministratorModel.getUsersById(id)

      runInAction(() => {
        this.user = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async makePayment(data) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await AdministratorModel.makePayment(data)
      await this.getUserInfo(data.recipientId)
      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }
}
