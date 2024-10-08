import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { batchesViewColumns } from '@components/table/table-columns/batches-columns'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

const filtersFields = [
  'asin',
  'amazonTitle',
  'title',
  'destination',
  'humanFriendlyId',
  'storekeeper',
  'logicsTariff',
  'finalWeight',
  'deliveryTotalPrice',
  'totalPrice',
  'etd',
  'eta',
  'cls',
  'updatedAt',
  'amount',
  'trackingNumber',
  'arrivalDate',
  'quantityBoxes',
]

export class WarehouseAwaitingBatchesViewModel {
  requestStatus = undefined

  nameSearchValue = ''
  batches = []
  boxesData = []

  selectedBatches = []
  curBatch = undefined
  showConfirmModal = false
  isWarning = false
  showBatchInfoModal = false

  rowCount = 0

  showAddOrEditBatchModal = false

  showCircularProgress = false

  uploadedFiles = []
  progressValue = 0
  showProgress = false

  hsCodeData = {}

  showEditHSCodeModal = false

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  rowHandlers = {}

  status = undefined

  columnsModel = batchesViewColumns(this.rowHandlers, () => this.status)

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

  get isInvalidTariffBoxSelected() {
    return this.selectedBatches.some(batchId => {
      const findBatch = this.batches.find(batch => batch._id === batchId)
      return findBatch?.originalData?.boxes.some(box => box.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF)
    })
  }

  get isNeedConfirmPriceBoxSelected() {
    return this.selectedBatches.some(batchId => {
      const findBatch = this.batches.find(batch => batch._id === batchId)
      return findBatch?.originalData?.boxes.some(
        box => box.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
      )
    })
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  get currentData() {
    return this.batches
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES)

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
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getBatchesPagMy()
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

  async loadData() {
    try {
      this.getDataGridState()
      await this.getBatchesPagMy()
    } catch (error) {
      console.error(error)
    }
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
        storage: data.storage,
      })

      await this.loadData()

      runInAction(() => {
        this.curBatch = this.batches.find(batch => this.curBatch._id === batch.originalData._id)?.originalData

        toast.success(t(TranslationKey['Data saved successfully']))
      })
    } catch (error) {
      console.error(error)
    }
  }

  onChangeCurPage(e) {
    this.curPage = e

    this.getBatchesPagMy()
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getBatchesPagMy()
  }

  async onClickSaveHsCode(hsCode) {
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
  }

  async onClickHsCode(id) {
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
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
        // storekeeperId: null,
      })

      runInAction(() => {
        this.rowCount = result.count

        this.batches = warehouseBatchesDataConverter(result.rows, this.platformSettings?.volumeWeightCoefficient)
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)

      runInAction(() => {
        this.batches = []
      })
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickAddOrEditBatch(setting) {
    try {
      runInAction(() => {
        if (setting.isAdding) {
          this.selectedBatches = []
          this.curBatch = undefined
        }

        this.showCircularProgress = true
      })

      if (this.selectedBatches?.length) {
        const batch = await BatchesModel.getBatchesByGuid(this.selectedBatches?.[0])

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
    } finally {
      runInAction(() => {
        this.showCircularProgress = false
      })
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

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.error(error)
    }
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

  async patchActualShippingCostBatch(id, cost) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost || '0',
    })

    await this.setCurrentOpenedBatch(id, true)
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
      for (let i = 0; i < this.selectedBatches.length; i++) {
        const batchId = this.selectedBatches[i]

        const batch = this.batches.find(el => el._id === batchId)

        if (batch.originalData.boxes[0]?.destination?.storekeeper) {
          await this.confirmSendToStorekeeper(batchId)
        } else {
          await this.confirmSendToBatch(batchId)
        }
      }

      runInAction(() => {
        this.selectedBatches = []
      })

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
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
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

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

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)
      console.error(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
  }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        ...dataGridFiltersInitializer(filtersFields),
      }
    })

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
        'title',
      ]),
    )
  }
}
