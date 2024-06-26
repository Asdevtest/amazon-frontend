import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { SupervisorModel } from '@models/supervisor-model'

import { t } from '@utils/translations'

import { supervisorReadyToCheckColumns } from './supervisor-ready-to-check-view.columns'
import { supervisorReadyToCheckConfig } from './supervisor-ready-to-check-view.config'

export class SupervisorReadyToCheckViewModel extends DataGridTableModel {
  isCreatedByClient = false

  constructor(isCreatedByClient) {
    const columnsProps = {
      onPickUp: id => this.onPickUp(id),
    }
    const columnsModel = supervisorReadyToCheckColumns(columnsProps)
    super({
      getMainDataMethod: () => SupervisorModel.getProductsVacant(isCreatedByClient),
      columnsModel,
      tableKey: DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS,
    })

    this.isCreatedByClient = isCreatedByClient
    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getDataGridState()
    this.getCurrentData()
    this.initHistory()

    makeObservable(this, supervisorReadyToCheckConfig)
  }

  async onPickUpSomeItems() {
    try {
      for (let i = 0; i < this.selectedRows.length; i++) {
        const itemId = this.selectedRows[i]
        await this.onPickUp(itemId, true)
      }

      runInAction(() => {
        this.selectedRows = []
      })

      this.getCurrentData()
      toast.success(t(TranslationKey['Taken to Work']))
    } catch (error) {
      console.error(error)
    }
  }

  async onPickUp(id, noPush) {
    try {
      await SupervisorModel.pickupProduct(id)

      if (!noPush) {
        const currentPartPath = this.isCreatedByClient ? 'ready-to-check-by-client' : 'ready-to-check'

        this.history.push({
          pathname: `/supervisor/${currentPartPath}/product`,
          search: 'product-id=' + id,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
