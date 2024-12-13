/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { IBatch } from '@typings/models/batches/batch'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'

import { clientBatchesViewColumns } from '../client-awaiting-batches-view/client-batches-columns'

import { additionalFilterFields, fieldsForSearch } from './client-sent-batches-view.constants'
import { observerConfig } from './observer-config'

export class ClientSentBatchesViewModel extends DataGridFilterTableModel {
  curBatch: IBatch | null = null
  currentStorekeeperId: string = ''
  storekeepersData: IStorekeeper[] = []
  uploadedFiles = []

  isArchive = false
  showBatchInfoModal = false
  showConfirmModal = false

  constructor({ history }: { history: any }) {
    const rowHandlers = {
      onClickSaveArrivalDate: (id: string, date: string) => this.onClickSaveArrivalDate(id, date),
      onClickSaveTrackingNumber: (id: string, trackingNumber: string) =>
        this.onClickSaveTrackingNumber(id, trackingNumber),
    }

    const columnsModel = clientBatchesViewColumns(rowHandlers)

    const defaultGetCurrentDataOptions = () => ({
      archive: this.isArchive,
      status: BatchStatus.HAS_DISPATCHED,
      ...(this.currentStorekeeperId ? { storekeeperId: this.currentStorekeeperId } : {}),
    })

    super({
      getMainDataMethod: BatchesModel.getBatchesWithFiltersPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, additionalFilterFields),
      mainMethodURL: `batches/with_filters?status=${BatchStatus.HAS_DISPATCHED}&`,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.CLIENT_BATCHES,
      defaultGetCurrentDataOptions,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, observerConfig)

    this.history = history
    if (history.location.state) {
      this.isArchive = history.location.state.isArchive
    }

    this.getTableSettingsPreset()
    this.getStorekeepers()
  }

  onTriggerArchive() {
    this.selectedRows = []

    this.isArchive
      ? this.history?.push?.('/client/batches/sent-batches', { isArchive: !this.isArchive })
      : this.history?.push?.('/client/batches/sent-batches/archive', { isArchive: !this.isArchive })
  }

  onClickTriggerArchOrResetProducts() {
    this.confirmModalSettings = {
      isWarning: !this.isArchive,
      title: this.isArchive ? t(TranslationKey['Return to actual batches']) : t(TranslationKey['Move a batch']),
      message: this.isArchive
        ? t(TranslationKey['After confirmation, the batch will be moved to the actual batches. Continue?'])
        : t(TranslationKey['After confirmation, the batch will be moved to the archive. Move?']),
      onSubmit: () => this.onSubmitTriggerArchOrResetProducts(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitTriggerArchOrResetProducts() {
    try {
      await BatchesModel.editUpdateBatches({
        batchIds: this.selectedRows,
        archive: !this.isArchive,
      })

      this.getCurrentData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(
        [BoxStatus.IN_BATCH_ON_THE_WAY, BoxStatus.FINISH_PREP_CENTR_USA].join(','),
      )

      runInAction(() => {
        this.storekeepersData = result as unknown as IStorekeeper[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickStorekeeperBtn(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.selectedRows = []
    this.currentStorekeeperId = currentValue

    this.getCurrentData()
  }

  async onSubmitChangeBoxFields(data: any) {
    try {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: data.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles,
        prepId: data.prepId,
        // storage: data.storage,
      })

      toast.success(t(TranslationKey['Data saved successfully']))

      await this.getCurrentData()

      this.setCurrentOpenedBatch(this.curBatch?._id, true)
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedBatch(id?: string, notTriggerModal?: boolean) {
    try {
      const batch = await BatchesModel.getBatchesByGuid(id)

      runInAction(() => {
        this.curBatch = batch as unknown as IBatch
      })

      if (!notTriggerModal) {
        this.onTriggerOpenModal('showBatchInfoModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async patchActualShippingCostBatch(id: string, cost: number) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost,
    })

    this.setCurrentOpenedBatch(id, true)
  }

  async onClickSaveArrivalDate(id: string, date: string) {
    let arrivalDate = null

    if (date) {
      const newDate = new Date(date)
      newDate.setUTCHours(0)
      newDate.setUTCSeconds(0)
      arrivalDate = newDate.toISOString()
    }

    await BatchesModel.changeBatch(id, { arrivalDate })
    this.getCurrentData()
  }

  async onClickSaveTrackingNumber(id: string, trackingNumber: string) {
    try {
      await BatchesModel.changeBatch(id, { trackingNumber })
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
