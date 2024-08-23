import { makeObservable, runInAction } from 'mobx'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { OtherModel } from '@models/other-model'

import { financesViewColumns } from '@views/shared/finances-view/finances-view.columns'

import { loadingStatus } from '@typings/enums/loading-status'

import { userBalanceConfig } from './user-balance.config'

export class UserBalanceModel extends DataGridTableModel {
  user = undefined
  showReplenishModal = false
  showWithdrawModal = false

  constructor(userId) {
    const columnsModel = financesViewColumns(true)

    super({
      getMainDataMethod: () => OtherModel.getPaymentsByUserId(userId),
      columnsModel,
    })

    this.sortModel = [{ field: 'createdAt', sort: 'desc' }]
    this.getDataGridState()
    this.getUserInfo(userId)
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
