import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { tableProductViewMode } from '@constants/keys/table-product-view'
import { BatchStatus } from '@constants/statuses/batch-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientBatchesViewColumns } from '@components/table/table-columns/client/client-batches-columns'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { filtersFields } from './client-awaiting-batches-view.constants'

export class ClientAwaitingBatchesViewModel {
  history = undefined
  requestStatus = undefined

  nameSearchValue = ''
  batches = []
  selectedBatches = []
  curBatch = {}

  hsCodeData = {}
  showEditHSCodeModal = false

  currentStorekeeperId = undefined

  storekeepersData = []

  uploadedFiles = []

  showBatchInfoModal = false
  showConfirmModal = false
  showAddOrEditBatchModal = false

  showWarningInfoModal = false

  boxesData = []
  volumeWeightCoefficient = undefined

  curBox = undefined
  showBoxViewModal = false

  progressValue = 0
  showProgress = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  productViewMode = tableProductViewMode.EXTENDED

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'

  rowHandlers = {
    changeViewModeHandler: value => this.changeViewModeHandler(value),
  }

  columnsModel = clientBatchesViewColumns(this.rowHandlers, this.productViewMode)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBatchesPagMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    return this.batches
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_AWAITING_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_AWAITING_BATCHES]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()

    this.getBatchesPagMy()
  }

  onChangePaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getBatchesPagMy()
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
    this.selectedBatches = model
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
      console.log(error)
    }
  }

  onClickStorekeeperBtn(currentStorekeeperId) {
    this.selectedBatches = []

    this.currentStorekeeperId = currentStorekeeperId

    this.getBatchesPagMy()
  }

  loadData() {
    try {
      this.getStorekeepers()
      this.getDataGridState()
      this.getBatchesPagMy()
    } catch (error) {
      console.log(error)
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
      })

      await this.loadData()

      runInAction(() => {
        this.curBatch = this.batches.find(batch => this.curBatch._id === batch.originalData._id)?.originalData

        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  async getBatchesPagMy() {
    try {
      const result = await BatchesModel.getBatchesWithFiltersPag({
        status: BatchStatus.IS_BEING_COLLECTED,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        filters: this.getFilter(),
        storekeeperId: this.currentStorekeeperId,
      })

      const res = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.rowCount = result.count

        this.volumeWeightCoefficient = res.volumeWeightCoefficient

        this.batches = warehouseBatchesDataConverter(result.rows, this.volumeWeightCoefficient)
      })
    } catch (error) {
      runInAction(() => {
        this.batches = []
      })
      console.log(error)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getBatchesPagMy()
  }

  async setCurrentOpenedBatch(id, notTriggerModal) {
    try {
      const batch = await BatchesModel.getBatchesByGuid(id)
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.curBatch = batch
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      if (!notTriggerModal) {
        this.onTriggerOpenModal('showBatchInfoModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async removeBoxFromBatch(batch) {
    try {
      const boxesToRemoveIds = batch.boxes.map(box => box._id)

      await BatchesModel.removeBoxFromBatch(batch._id, boxesToRemoveIds)
    } catch (error) {
      console.log(error)
    }
  }

  async onClickCancelSendToBatchBtn() {
    try {
      const batches = this.batches.filter(el => this.selectedBatches.includes(el._id))

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i].originalData

        await this.removeBoxFromBatch(batch)
      }

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickAddOrEditBatch(setting) {
    try {
      runInAction(() => {
        if (setting.isAdding) {
          this.selectedBatches = []
        }
      })

      const [boxes, result] = await Promise.all([
        BoxesModel.getBoxesReadyToBatchClient(),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.boxesData = boxes
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.log(error)
    }
  }

  async patchActualShippingCostBatch(id, cost) {
    try {
      await BatchesModel.changeBatch(id, {
        actualShippingCost: cost || '0',
      })

      this.setCurrentOpenedBatch(id, true)
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitAddOrEditBatch({ boxesIds, filesToAdd, sourceBoxesIds, batchToEdit, batchFields }) {
    try {
      if (filesToAdd.length) {
        await onSubmitPostImages.call(this, { images: filesToAdd, type: 'uploadedFiles' })
      }

      if (!batchToEdit) {
        const batchId = await BatchesModel.createBatch({
          title: batchFields.title,
          boxesIds,
          calculationMethod: batchFields.calculationMethod,
          volumeWeightDivide: batchFields.volumeWeightDivide,
        })

        if (filesToAdd.length) {
          await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)
        }
      } else {
        const newBoxesIds = boxesIds.filter(boxId => !sourceBoxesIds.includes(boxId))
        const boxesToRemoveIds = sourceBoxesIds.filter(boxId => !boxesIds.includes(boxId))

        await BatchesModel.changeBatch(batchToEdit.id, {
          title: batchFields.title,
          calculationMethod: batchFields.calculationMethod,
          volumeWeightDivide: batchFields.volumeWeightDivide,
        })

        if (newBoxesIds.length) {
          await BatchesModel.addBoxToBatch(batchToEdit.id, newBoxesIds)
        }
        if (boxesToRemoveIds.length) {
          await BatchesModel.removeBoxFromBatch(batchToEdit.id, boxesToRemoveIds)
        }

        if (filesToAdd.length) {
          await BatchesModel.editAttachedDocuments(
            batchToEdit.id,
            batchToEdit.originalData.attachedDocuments
              ? [...batchToEdit.originalData.attachedDocuments, ...this.uploadedFiles]
              : [...this.uploadedFiles],
          )
        }
      }

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.log(error)
    }
  }

  changeViewModeHandler(value) {
    this.productViewMode = value
    this.columnsModel = clientBatchesViewColumns(this.rowHandlers, this.productViewMode)
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  // * Filtration

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'batches'),
        column,

        `batches/with_filters?filters=${this.getFilter(column)}&status=${BatchStatus.IS_BEING_COLLECTED}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getBatchesPagMy()
    this.getDataGridState()
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'amazonTitle',
        'humanFriendlyId',
        'asin',
        'orderHumanFriendlyId',
      ]),
    )
  }
}
