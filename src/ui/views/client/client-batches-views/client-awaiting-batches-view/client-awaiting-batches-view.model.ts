import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { tableProductViewMode } from '@typings/enums/table-product-view'

import { filtersFields } from './client-awaiting-batches-view.constants'
import { clientBatchesViewColumns } from './client-batches-columns'

export class ClientAwaitingBatchesViewModel extends DataGridFilterTableModel {
  currentSearchValue = ''
  curBatch = undefined

  hsCodeData = {}
  showEditHSCodeModal = false

  currentStorekeeperId = undefined

  storekeepersData = []

  uploadedFiles = []

  showBatchInfoModal = false
  showConfirmModal = false
  showAddOrEditBatchModal = false

  boxesData = []

  curBox = undefined
  showBoxViewModal = false

  progressValue = 0
  showProgress = false

  productViewMode = tableProductViewMode.EXTENDED

  columnsModel = clientBatchesViewColumns(this.rowHandlers, this.productViewMode)

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.getBatchesPagMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const rowHandlers = {
      changeViewModeHandler: value => this.changeViewModeHandler(value),
    }

    const columnsModel = clientBatchesViewColumns(rowHandlers, this.productViewMode)

    super({
      getMainDataMethod: BatchesModel.getBatchesWithFiltersPag,
      columnsModel,
    })

    // getMainDataMethod: (...args: any) => any
    // columnsModel: GridColDef[]
    // filtersFields: string[]
    // mainMethodURL: string
    // fieldsForSearch?: string[]
    // tableKey?: string
    // defaultGetCurrentDataOptions?: any
    // additionalPropertiesColumnMenuSettings?: any
    // additionalPropertiesGetFilters?: any

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.CLIENT_AWAITING_BATCHES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.CLIENT_AWAITING_BATCHES)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  async onClickSaveHsCode(hsCode) {
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
      this.loadData()

      runInAction(() => {
        this.selectedProduct = undefined
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickHsCode(id) {
    try {
      const response = await ProductModel.getProductsHsCodeByGuid(id)

      runInAction(() => {
        this.hsCodeData = response
      })

      this.onTriggerOpenModal('showEditHSCodeModal')
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      const box = await BoxesModel.getBoxById(row._id)

      runInAction(() => {
        this.curBox = box
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  onSelectionModel(model) {
    this.selectedRows = model
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_BATCH)

      runInAction(() => {
        this.storekeepersData = result

        this.currentStorekeeperId = this.currentStorekeeperId || undefined // result.filter(storekeeper => storekeeper.boxesCount !== 0).sort((a, b) => a.name?.localeCompare(b.name))[0]
      })

      this.getDataGridState()
    } catch (error) {
      console.error(error)
    }
  }

  onClickStorekeeperBtn(currentStorekeeperId) {
    this.selectedRows = []

    this.currentStorekeeperId = currentStorekeeperId

    this.getBatchesPagMy()
  }

  loadData() {
    try {
      this.getStorekeepers()
      this.getDataGridState()
      this.getBatchesPagMy()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      await onSubmitPostImages.call(this, { images: data.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles,
        prepId: data.prepId,
        storage: data.storage,
      })

      await this.loadData()

      runInAction(() => {
        this.curBatch = this.currentData.find(batch => this.curBatch._id === batch._id)
      })

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  async getBatchesPagMy() {
    try {
      const result = await BatchesModel.getBatchesWithFiltersPag({
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        filters: this.getFilter(),

        status: BatchStatus.IS_BEING_COLLECTED,
        storekeeperId: this.currentStorekeeperId,
      })

      runInAction(() => {
        this.rowCount = result.count
        this.currentData = warehouseBatchesDataConverter(result.rows, this.platformSettings?.volumeWeightCoefficient)
      })
    } catch (error) {
      console.error(error)
    }
  }

  onSearchSubmit(searchValue) {
    this.currentSearchValue = searchValue

    this.getBatchesPagMy()
  }

  async setCurrentOpenedBatch(id, notTriggerModal) {
    try {
      const batch = await BatchesModel.getBatchesByGuid(id)

      runInAction(() => {
        this.curBatch = batch
      })

      if (!notTriggerModal) {
        this.onTriggerOpenModal('showBatchInfoModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async removeBoxFromBatch(batch) {
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

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
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

      const boxes = await BoxesModel.getBoxesReadyToBatchClient()

      runInAction(() => {
        this.boxesData = boxes
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async patchActualShippingCostBatch(id, cost) {
    try {
      await BatchesModel.changeBatch(id, {
        actualShippingCost: cost || '0',
      })

      this.setCurrentOpenedBatch(id, true)
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

        if (newBoxesIds?.length) {
          await BatchesModel.addBoxToBatch(batchToEdit._id, newBoxesIds)
        }
        if (boxesToRemoveIds?.length) {
          await BatchesModel.removeBoxFromBatch(batchToEdit._id, boxesToRemoveIds)
        }

        await BatchesModel.editAttachedDocuments(batchToEdit._id, this.uploadedFiles)
      }

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  changeViewModeHandler(value) {
    this.productViewMode = value
    this.columnsModel = clientBatchesViewColumns(this.rowHandlers, this.productViewMode)
  }

  // async onClickFilterBtn(column) {
  //   try {
  //     this.setFilterRequestStatus(loadingStatus.IS_LOADING)

  //     const data = await GeneralModel.getDataForColumn(
  //       getTableByColumn(column, 'batches'),
  //       column,

  //       `batches/with_filters?filters=${this.getFilter(column)}&status=${BatchStatus.IS_BEING_COLLECTED}`,
  //     )

  //     if (this.columnMenuSettings[column]) {
  //       this.columnMenuSettings = {
  //         ...this.columnMenuSettings,
  //         [column]: { ...this.columnMenuSettings[column], filterData: data },
  //       }
  //     }

  //     this.setFilterRequestStatus(loadingStatus.SUCCESS)
  //   } catch (error) {
  //     this.setFilterRequestStatus(loadingStatus.FAILED)
  //     console.error(error)
  //   }
  // }

  // getFilter(exclusion) {
  //   return objectToUrlQs(
  //     dataGridFiltersConverter(this.columnMenuSettings, this.currentSearchValue, exclusion, filtersFields, [
  //       'amazonTitle',
  //       'humanFriendlyId',
  //       'asin',
  //       'orderHumanFriendlyId',
  //     ]),
  //   )
  // }
}
