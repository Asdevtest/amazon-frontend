/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ProductModel } from '@models/product-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { tableProductViewMode } from '@typings/enums/table-product-view'
import { IBatch } from '@typings/models/batches/batch'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { IHSCode } from '@typings/shared/hs-code'

import { clientBatchesViewColumns } from '../client-awaiting-batches-view/client-batches-columns'

import { fieldsForSearch, filtersFields } from './client-sent-batches-view.constants'
import { observerConfig } from './observer-config'

export class ClientSentBatchesViewModel extends DataGridFilterTableModel {
  curBatch: IBatch | null = null
  currentStorekeeperId: string = ''
  storekeepersData: IStorekeeper[] = []
  hsCodeData: IHSCode | null = null
  productViewMode = tableProductViewMode.EXTENDED
  uploadedFiles = []

  isArchive = false
  showEditHSCodeModal = false
  showBatchInfoModal = false
  showConfirmModal = false

  constructor({ history }: { history: any }) {
    const rowHandlers = {
      changeViewModeHandler: (value: tableProductViewMode) => this.changeViewModeHandler(value),
      onClickSaveArrivalDate: (id: string, date: string) => this.onClickSaveArrivalDate(id, date),
    }

    const columnsModel = clientBatchesViewColumns(rowHandlers, () => this.productViewMode)

    const defaultGetCurrentDataOptions = () => ({
      archive: this.isArchive,
      status: BatchStatus.HAS_DISPATCHED,
      ...(this.currentStorekeeperId ? { storekeeperId: this.currentStorekeeperId } : {}),
    })

    super({
      getMainDataMethod: BatchesModel.getBatchesWithFiltersPag,
      columnsModel,
      filtersFields,
      mainMethodURL: `batches/with_filters?status=${BatchStatus.HAS_DISPATCHED}&`,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.CLIENT_BATCHES,
      defaultGetCurrentDataOptions,
    })
    makeObservable(this, observerConfig)

    this.history = history
    if (history.location.state) {
      this.isArchive = history.location.state.isArchive
    }

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.getDataGridState()
    this.getStorekeepers()
    this.getCurrentData()

    reaction(
      () => this.productViewMode,
      () => (this.columnsModel = columnsModel),
    )
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

  async onClickSaveHsCode(hsCode: IHSCode) {
    await ProductModel.editProductsHsCods([
      {
        productId: hsCode._id,
        chinaTitle: hsCode.chinaTitle || null,
        hsCode: hsCode.hsCode || null,
        material: hsCode.material || null,
        productUsage: hsCode.productUsage || null,
      },
    ])

    this.onTriggerOpenModal('showEditHSCodeModal')
    this.getCurrentData()
  }

  async onClickHsCode(id: string) {
    try {
      const response = await ProductModel.getProductsHsCodeByGuid(id)

      runInAction(() => {
        this.hsCodeData = response as unknown as IHSCode
      })

      this.onTriggerOpenModal('showEditHSCodeModal')
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

  onClickStorekeeperBtn(currentStorekeeperId: string) {
    this.selectedRows = []
    this.currentStorekeeperId = currentStorekeeperId

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

  changeViewModeHandler(value: tableProductViewMode) {
    this.productViewMode = value
  }

  async onClickSaveArrivalDate(id: string, date: string) {
    await BatchesModel.changeBatch(id, { arrivalDate: date })
    this.getCurrentData()
  }
}
