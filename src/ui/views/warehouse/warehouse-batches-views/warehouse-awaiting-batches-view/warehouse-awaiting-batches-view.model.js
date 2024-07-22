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
import { UserModel } from '@models/user-model'

import { batchesViewColumns } from '@components/table/table-columns/batches-columns'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { fieldsForSearch, warehouseAwaitingBatchesConfig } from './warehouse-awaiting-batches-view.config'

export class WarehouseAwaitingBatchesViewModel extends DataGridFilterTableModel {
  boxesData = []
  curBatch = undefined
  showConfirmModal = false
  showBatchInfoModal = false
  showAddOrEditBatchModal = false
  uploadedFiles = []

  get isInvalidTariffBoxSelected() {
    return this.selectedRows.some(batchId => {
      const findBatch = this.currentData.find(batch => batch._id === batchId)

      return findBatch?.boxes.some(box => box.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF)
    })
  }
  get isNeedConfirmPriceBoxSelected() {
    return this.selectedRows.some(batchId => {
      const findBatch = this.currentData.find(batch => batch._id === batchId)

      return findBatch?.boxes.some(box => box.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE)
    })
  }
  get userInfo() {
    return UserModel.userInfo
  }
  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const columnsModel = batchesViewColumns()
    const filtersFields = getFilterFields(columnsModel)
    const defaultGetCurrentDataOptions = () => ({
      status: BatchStatus.IS_BEING_COLLECTED,
    })

    super({
      getMainDataMethod: BatchesModel.getBatchesWithFiltersPag,
      columnsModel,
      filtersFields,
      mainMethodURL: 'batches/with_filters?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES,
      defaultGetCurrentDataOptions,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, warehouseAwaitingBatchesConfig)
  }

  async onSubmitChangeBoxFields(data) {
    try {
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

  async onClickAddOrEditBatch(setting) {
    try {
      runInAction(() => {
        if (setting.isAdding) {
          this.selectedRows = []
          this.curBatch = undefined
        }
      })

      if (this.selectedRows?.length) {
        const batch = await BatchesModel.getBatchesByGuid(this.selectedRows?.[0])

        runInAction(() => {
          this.curBatch = batch
        })
      }

      const boxes = await BoxesModel.getBoxesReadyToBatchStorekeeper()

      runInAction(() => {
        this.boxesData = boxes
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitAddOrEditBatch({ boxesIds, filesToAdd, sourceBoxesIds, batchToEdit, batchFields }) {
    try {
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

  async setCurrentOpenedBatch(id) {
    try {
      const batch = await BatchesModel.getBatchesByGuid(id)

      runInAction(() => {
        this.curBatch = batch
      })
    } catch (error) {
      console.error(error)
    }
  }

  async patchActualShippingCostBatch(id, cost) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost || '0',
    })

    this.setCurrentOpenedBatch(id)
  }

  async confirmSendToBatch(batchId) {
    try {
      await BatchesModel.confirmSentToBatch(batchId)
    } catch (error) {
      console.error(error)
    }
  }

  async confirmSendToStorekeeper(batchId) {
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
}
