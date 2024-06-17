import { makeObservable, runInAction } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { supervisorSettingsViewColumns } from './supervisor-settings-view.columns'
import { supervisorSettingsConfig } from './supervisor-settings-view.config'

export class SupervisorSettingsViewModel extends DataGridFilterTableModel {
  asins = []
  failedData = undefined
  asinsToEdit = undefined

  showAsinCheckerModal = false
  showEditAsinCheckerModal = false
  showFailedAsinsModal = false
  showConfirmCloseAsinCheckerModal = false

  get userInfo() {
    return UserModel.userInfo
  }

  constructor() {
    const columnsProps = {
      onClickRemoveBtn: row => this.onClickRemoveBtn(row),
      onClickEditBtn: row => this.onClickEditBtn(row),
    }
    const columnsModel = supervisorSettingsViewColumns(columnsProps)

    super({
      getMainDataMethod: OtherModel.getAsins,
      columnsModel,
    })

    this.getDataGridState()
    this.getCurrentData()

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
    } catch (error) {
      console.error(error)
    }
  }

  async onEditAsins(id, data) {
    try {
      await OtherModel.editAsins(id, data)

      this.onTriggerOpenModal('showEditAsinCheckerModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveAsin(id) {
    try {
      await OtherModel.removeAsin(id)
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveAsins(ids) {
    try {
      await OtherModel.removeAsins(ids)
    } catch (error) {
      console.error(error)
    }
  }

  onClickRemoveBtn(id) {
    this.onRemoveAsin(id)
  }

  onClickRemoveSelectedBtn() {
    this.onRemoveAsins(this.selectedRows)
  }

  onClickEditBtn(row) {
    this.asinsToEdit = row

    this.onTriggerOpenModal('showEditAsinCheckerModal')
  }
}
