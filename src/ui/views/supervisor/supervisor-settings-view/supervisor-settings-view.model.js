import { makeObservable, reaction, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { mapProductStrategyStatusEnumToKey } from '@constants/product/product-strategy-status'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { supervisorSettingsViewColumns } from './supervisor-settings-view.columns'
import { fieldsForSearch, supervisorSettingsConfig, tabsValues } from './supervisor-settings-view.config'

export class SupervisorSettingsViewModel extends DataGridTableModel {
  failedData = undefined
  asinsToEdit = undefined
  condition = tabsValues.ONLINE_ARBITRAGE_CHINA

  showAsinCheckerModal = false
  showEditAsinCheckerModal = false
  showFailedAsinsModal = false
  showConfirmCloseAsinCheckerModal = false

  get userInfo() {
    return UserModel.userInfo
  }

  constructor() {
    const columnsProps = {
      onRemoveAsin: id => this.onRemoveAsin(id),
      onEditAsin: data => this.onEditAsin(data),
    }
    const columnsModel = supervisorSettingsViewColumns(columnsProps)

    super({
      getMainDataMethod: OtherModel.getAsins,
      columnsModel,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.SUPERVISOR_SETTINGS,
    })

    this.sortModel = [{ field: 'asin', sort: 'desc' }]

    this.getDataGridState()
    this.onChangeСondition(this.condition)

    makeObservable(this, supervisorSettingsConfig)
  }

  async onSubmitAsins(data) {
    try {
      const response = await OtherModel.checkAsins(data)

      runInAction(() => {
        this.failedData = response
      })

      if (this.failedData.failed.length) {
        this.onTriggerOpenModal('showFailedAsinsModal')
      }

      this.onTriggerOpenModal('showAsinCheckerModal')

      this.onChangeСondition(this.condition)
      this.setDataByCondition()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitEditAsin(id, data) {
    try {
      await OtherModel.editAsins(id, data)

      this.onTriggerOpenModal('showEditAsinCheckerModal')
      await this.getCurrentData()
      this.setDataByCondition()
    } catch (error) {
      console.error(error)
    }
  }

  onEditAsin(row) {
    this.asinsToEdit = row
    this.onTriggerOpenModal('showEditAsinCheckerModal')
  }

  async onRemoveAsin(id) {
    try {
      await OtherModel.removeAsin(id)

      await this.getCurrentData()
      this.setDataByCondition()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveAsins() {
    try {
      await OtherModel.removeAsins(this.selectedRows)

      await this.getCurrentData()
      this.setDataByCondition()
    } catch (error) {
      console.error(error)
    }
  }

  async onChangeСondition(value) {
    const currentValue = value
    runInAction(() => {
      this.condition = currentValue
    })

    await this.getCurrentData()
    this.setDataByCondition()
  }

  setDataByCondition() {
    this.currentData = this.currentData.filter(
      item => item.strategy === mapProductStrategyStatusEnumToKey[this.condition].toString(),
    )
  }
}
