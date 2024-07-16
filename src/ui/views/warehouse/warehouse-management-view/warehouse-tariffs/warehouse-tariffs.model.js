import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { t } from '@utils/translations'

import { warehouseTariffsColumns } from './warehouse-tariffs.columns'
import { warehouseTariffsConfig } from './warehouse-tariffs.config'

export class WarehouseTariffModel extends DataGridTableModel {
  tariffToEdit = undefined
  showAddOrEditWarehouseTariffModal = false

  constructor() {
    const columnsProps = {
      onRemoveTariff: row => this.onRemoveTariff(row),
      onClickEditTariff: row => this.onClickEditTariff(row),
    }
    const columnsModel = warehouseTariffsColumns(columnsProps)

    super({
      getMainDataMethod: StorekeeperModel.getWarehouseTariffs,
      columnsModel,
    })

    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, warehouseTariffsConfig)
  }

  onClickEditTariff(row) {
    this.tariffToEdit = row
    this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
  }

  async onCreateTariff(data) {
    try {
      await StorekeeperModel.createWarehouseTariff(data)

      this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onEditTariff(id, data) {
    try {
      await StorekeeperModel.editWarehouseTariff(id, data)

      this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveTariff(id) {
    try {
      toast.warning(t(TranslationKey['Are you sure you want to delete the tariff?']))

      await StorekeeperModel.removeWarehouseTariff(id)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
