import { makeObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { IBatch } from '@typings/models/batches/batch'
import { IBox } from '@typings/models/boxes/box'
import { UploadFileType } from '@typings/shared/upload-file'

import { warehouseMyBatchesViewColumns } from './warehouse-my-batches-view.columns'
import { IColumnsProps, fieldsForSearch, warehouseMyBatchesConfig } from './warehouse-my-batches-view.config'

export class WarehouseAwaitingBatchesViewModel extends DataGridFilterTableModel {
  boxesData: IBox[] = []
  curBatch?: IBatch
  showConfirmModal = false
  showBatchInfoModal = false
  showAddOrEditBatchModal = false
  uploadedFiles: UploadFileType[] = []
  isArchive = false

  get isInvalidTariffBoxSelected() {
    return this.selectedRows.some(batchId => {
      const findBatch = this.currentData.find(batch => batch._id === batchId)

      return findBatch?.boxes.some((box: IBox) => box.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF)
    })
  }
  get isNeedConfirmPriceBoxSelected() {
    return this.selectedRows.some(batchId => {
      const findBatch = this.currentData.find(batch => batch._id === batchId)

      return findBatch?.boxes.some((box: IBox) => box.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE)
    })
  }
  get userInfo() {
    return UserModel.userInfo
  }
  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor(isSentBatches: boolean) {
    const columnsProps: IColumnsProps = {
      onClickSaveTrackingNumber: (id, trackingNumber) => this.onClickSaveTrackingNumber(id, trackingNumber),
      onClickSaveArrivalDate: (id, date) => this.onClickSaveArrivalDate(id, date),
      isSentBatches,
    }
    const columnsModel = warehouseMyBatchesViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel, ['amazonTitle'])
    const defaultGetCurrentDataOptions = () => ({
      status: isSentBatches ? BatchStatus.HAS_DISPATCHED : BatchStatus.IS_BEING_COLLECTED,
      archive: isSentBatches ? this.isArchive : undefined,
    })

    super({
      getMainDataMethod: BatchesModel.getBatchesWithFiltersPag,
      columnsModel,
      filtersFields,
      mainMethodURL: 'batches/with_filters?',
      fieldsForSearch,
      tableKey: isSentBatches ? DataGridTablesKeys.WAREHOUSE_BATCHES : DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES,
      defaultGetCurrentDataOptions,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, warehouseMyBatchesConfig)

    reaction(
      () => this.isArchive,
      () => this.getCurrentData(),
    )
  }

  async onSubmitChangeBoxFields(data: IBox) {
    try {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: data.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(data._id, {
        storekeeperComment: data.storekeeperComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles,
        upsTrackNumber: data.upsTrackNumber,
        prepId: data.prepId,
        // storage: data.storage,
      })

      toast.success(t(TranslationKey['Data saved successfully']))

      this.setCurrentOpenedBatch(this.curBatch?._id)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickAddOrEditBatch(isAdding: boolean) {
    try {
      runInAction(() => {
        if (isAdding) {
          this.selectedRows = []
          this.curBatch = undefined
        }
      })

      if (this.selectedRows?.length) {
        const batch = (await BatchesModel.getBatchesByGuid(this.selectedRows?.[0])) as unknown as IBatch

        runInAction(() => {
          this.curBatch = batch
        })
      }

      const boxes = (await BoxesModel.getBoxesReadyToBatchStorekeeper()) as unknown as IBox[]

      runInAction(() => {
        this.boxesData = boxes
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitAddOrEditBatch({
    boxesIds,
    filesToAdd,
    sourceBoxesIds,
    batchToEdit,
    batchFields,
  }: {
    boxesIds: string[]
    filesToAdd: UploadFileType[]
    sourceBoxesIds: string[]
    batchToEdit?: IBatch
    batchFields: IBatch
  }) {
    try {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: filesToAdd, type: 'uploadedFiles' })

      if (!batchToEdit) {
        const batchId = await BatchesModel.createBatch({
          title: batchFields.title,
          boxesIds,
          calculationMethod: batchFields.calculationMethod,
          volumeWeightDivide: batchFields.volumeWeightDivide,
        })

        await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)
      } else {
        const newBoxesIds = boxesIds.filter(boxId => !sourceBoxesIds.includes(boxId))
        const boxesToRemoveIds = sourceBoxesIds.filter(boxId => !boxesIds.includes(boxId))

        await BatchesModel.changeBatch(batchToEdit._id, {
          title: batchFields.title,
          calculationMethod: batchFields.calculationMethod,
          volumeWeightDivide: batchFields.volumeWeightDivide,
        })

        if (newBoxesIds.length) {
          await BatchesModel.addBoxToBatch(batchToEdit._id, newBoxesIds)
        }
        if (boxesToRemoveIds.length) {
          await BatchesModel.removeBoxFromBatch(batchToEdit._id, boxesToRemoveIds)
        }

        await BatchesModel.editAttachedDocuments(batchToEdit._id, this.uploadedFiles)
      }

      this.onTriggerOpenModal('showAddOrEditBatchModal')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedBatch(id?: string) {
    try {
      const batch = (await BatchesModel.getBatchesByGuid(id)) as unknown as IBatch

      runInAction(() => {
        this.curBatch = batch
      })

      this.onTriggerOpenModal('showBatchInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  async patchActualShippingCostBatch(id: string, cost: string) {
    await BatchesModel.changeBatch(id, { actualShippingCost: cost || '0' })

    this.setCurrentOpenedBatch(id)
  }

  async confirmSendToBatch(batchId: string) {
    try {
      await BatchesModel.confirmSentToBatch(batchId)
    } catch (error) {
      console.error(error)
    }
  }

  async confirmSendToStorekeeper(batchId: string) {
    try {
      await StorekeeperModel.confirmSendToStorekeeper(batchId)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmSendToBatchBtn() {
    try {
      for (let i = 0; i < this.selectedRows.length; i++) {
        const batchId = this.selectedRows[i]

        const batch = this.currentData.find(el => el._id === batchId)

        if (batch?.boxes[0]?.destination?.storekeeper) {
          await this.confirmSendToStorekeeper(batchId)
        } else {
          await this.confirmSendToBatch(batchId)
        }
      }

      runInAction(() => {
        this.selectedRows = []
      })

      this.onTriggerOpenModal('showConfirmModal')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveTrackingNumber(id: string, trackingNumber: string) {
    try {
      await BatchesModel.changeBatch(id, { trackingNumber })
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveArrivalDate(id: string, date: string) {
    try {
      await BatchesModel.changeBatch(id, { arrivalDate: date })
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerArchive() {
    this.isArchive = !this.isArchive
  }
}
