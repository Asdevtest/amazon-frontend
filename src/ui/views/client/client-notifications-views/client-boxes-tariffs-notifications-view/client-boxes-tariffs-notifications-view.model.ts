import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'

import { INewDataOfVariation } from '@hooks/use-tariff-variation'

import { clientBoxesTariffsNotificationsViewColumns } from './client-boxes-tariffs-notifications.columns'
import { observerConfig } from './observer-config'

export class ClientBoxesTariffsNotificationsViewModel extends DataGridFilterTableModel {
  tariffIdToChange: string = ''
  curBox: IBox | null = null
  curBoxId: string = ''

  showBoxViewModal = false
  showSelectionStorekeeperAndTariffModal = false
  showConfirmModal = false

  storekeepersData: IStorekeeper[] = []

  uploadedFiles = []

  constructor() {
    const rowHandlers = {
      onTriggerOpenConfirmModal: (row: IBox) => this.onTriggerOpenConfirmModal(row),
      onTriggerOpenRejectModal: (row: IBox) => this.onTriggerOpenRejectModal(row),
    }

    const columnsModel = clientBoxesTariffsNotificationsViewColumns(rowHandlers)

    const additionalPropertiesGetFilters = () => ({
      status: {
        $eq: BoxStatus.NEED_TO_UPDATE_THE_TARIFF,
      },
    })

    super({
      getMainDataMethod: BoxesModel.getBoxesForCurClientLightPag,
      columnsModel,
      tableKey: DataGridTablesKeys.CLIENT_BOXES_TARIFF_NOTIFICATIONS,
      filtersFields: getFilterFields(columnsModel),
      mainMethodURL: 'boxes/pag/clients_light?',
      additionalPropertiesGetFilters,
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.getDataGridState()

    this.getCurrentData()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      runInAction(() => {
        this.storekeepersData = result as unknown as IStorekeeper[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onTriggerOpenConfirmModal(row: IBox) {
    try {
      const box = await BoxesModel.getBoxById(row._id)

      runInAction(() => {
        this.curBox = box as IBox
      })

      await this.getStorekeepers()

      this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSelectTariff({ destinationId, logicsTariffId, variationTariffId }: INewDataOfVariation) {
    try {
      await ClientModel.updateTariffIfTariffWasDeleted({
        boxId: this.curBox?._id,
        logicsTariffId,
        variationTariffId,
        destinationId,
      })

      this.getCurrentData()
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmTarrifChangeBtn(tariffData: INewDataOfVariation) {
    try {
      const finalSum = (this.curBox?.finalWeight || 1) * (tariffData?.pricePerKgUsd || 1)
      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          title: '',
          message: `${t(TranslationKey['The total cost of shipping the box will be'])}: $${toFixed(finalSum, 2)}`,
          onSubmit: () => this.onSubmitSelectTariff(tariffData),
          onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
        }
      })
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenRejectModal(row: IBox) {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(TranslationKey['Do you want to cancel?']),
      onSubmit: () => this.onClickRejectOrderPriceChangeBtn(row),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  setCurrentOpenedBox(row: IBox) {
    try {
      this.curBoxId = row._id

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickRejectOrderPriceChangeBtn(box: IBox) {
    try {
      await ClientModel.returnBoxFromBatch([{ boxId: box._id }])
      this.onTriggerOpenModal('showConfirmModal')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
