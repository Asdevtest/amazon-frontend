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
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { tableProductViewMode } from '@typings/enums/table-product-view'
import { IBatch } from '@typings/models/batches/batch'
import { IBox } from '@typings/models/boxes/box'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { IHSCode } from '@typings/shared/hs-code'
import { IUploadFile } from '@typings/shared/upload-file'

import { fieldsForSearch, filtersFields } from './client-awaiting-batches-view.constants'
import { clientBatchesViewColumns } from './client-batches-columns'
import { observerConfig } from './observer-config'

export class ClientAwaitingBatchesViewModel extends DataGridFilterTableModel {
  curBatch: IBatch | null = null

  hsCodeData: IHSCode | null = null

  currentStorekeeperId: string = ''
  storekeepersData: IStorekeeper[] = []

  uploadedFiles = []

  showEditHSCodeModal = false
  showBatchInfoModal = false
  showConfirmModal = false
  showBoxViewModal = false
  showAddOrEditBatchModal = false

  curBox: IBox | null = null

  showProgress = false

  boxesData: IBox[] = []

  progressValue = 0

  productViewMode = tableProductViewMode.EXTENDED

  get userInfo() {
    return UserModel.userInfo
  }

  constructor(isModalModel = false) {
    const rowHandlers = {
      changeViewModeHandler: (value: tableProductViewMode) => this.changeViewModeHandler(value),
    }

    const columnsModel = clientBatchesViewColumns(rowHandlers, () => this.productViewMode)

    const defaultGetCurrentDataOptions = () => ({
      status: BatchStatus.IS_BEING_COLLECTED,
      ...(this.currentStorekeeperId && { storekeeperId: this.currentStorekeeperId }),
    })

    super({
      getMainDataMethod: BatchesModel.getBatchesWithFiltersPag,
      columnsModel,
      filtersFields,
      mainMethodURL: `batches/with_filters?status=${BatchStatus.IS_BEING_COLLECTED}&`,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.CLIENT_AWAITING_BATCHES,
      defaultGetCurrentDataOptions,
    })
    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    if (!isModalModel) {
      this.getDataGridState()
      this.getStorekeepers()
      this.getCurrentData()
    }

    reaction(
      () => this.productViewMode,
      () => (this.columnsModel = columnsModel),
    )
  }

  async onClickSaveHsCode(hsCode: IHSCode) {
    try {
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
    } catch (error) {
      console.error(error)
    }
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
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_BATCH)

      runInAction(() => {
        this.storekeepersData = result as unknown as IStorekeeper[]

        this.currentStorekeeperId = this.currentStorekeeperId || ''
      })

      this.getDataGridState()
    } catch (error) {
      console.error(error)
    }
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

  onClickStorekeeperBtn(currentStorekeeperId: string) {
    this.onSelectionModel([])

    this.currentStorekeeperId = currentStorekeeperId

    this.getCurrentData()
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

  async removeBoxFromBatch(batch: IBatch) {
    try {
      const boxesToRemoveIds = batch.boxes.map(box => box._id)
      await BatchesModel.removeBoxFromBatch(batch._id, boxesToRemoveIds)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickCancelSendToBatchBtn() {
    try {
      const batches = this.currentData.filter(el => this.selectedRows.includes(el._id))

      for (let i = 0; i < batches.length; i++) {
        await this.removeBoxFromBatch(batches[i])
      }

      this.getCurrentData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickAddOrEditBatch(setting: any) {
    try {
      runInAction(() => {
        if (setting.isAdding) {
          this.selectedRows = []
          this.curBatch = null
        }
      })

      if (this.selectedRows?.length) {
        const batch = await BatchesModel.getBatchesByGuid(this.selectedRows?.[0])

        runInAction(() => {
          this.curBatch = batch as unknown as IBatch
        })
      }

      const boxes = await BoxesModel.getBoxesReadyToBatchClient()

      runInAction(() => {
        this.boxesData = boxes as unknown as IBox[]
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async patchActualShippingCostBatch(id: string, cost: number) {
    try {
      await BatchesModel.changeBatch(id, {
        actualShippingCost: cost || '0',
      })

      this.setCurrentOpenedBatch(id, true)
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
    filesToAdd: IUploadFile[]
    sourceBoxesIds: string[]
    batchToEdit: IBatch
    batchFields: any
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

        if (newBoxesIds?.length) {
          await BatchesModel.addBoxToBatch(batchToEdit._id, newBoxesIds)
        }
        if (boxesToRemoveIds?.length) {
          await BatchesModel.removeBoxFromBatch(batchToEdit._id, boxesToRemoveIds)
        }

        await BatchesModel.editAttachedDocuments(batchToEdit._id, this.uploadedFiles)
      }

      this.getCurrentData()
      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  changeViewModeHandler(value: tableProductViewMode) {
    this.productViewMode = value
  }

  async setCurrentOpenedBox(row: IBox) {
    try {
      const box = await BoxesModel.getBoxById(row._id)

      runInAction(() => {
        this.curBox = box as IBox
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }
}
