import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
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

import { batchesViewColumns } from '@components/table/table-columns/batches-columns'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

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
]

export class WarehouseAwaitingBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  volumeWeightCoefficient = undefined
  nameSearchValue = ''
  batches = []
  boxesData = []

  selectedBatches = []
  curBatch = {}
  showConfirmModal = false
  isWarning = false
  showBatchInfoModal = false

  currentData = []
  rowCount = 0

  showAddOrEditBatchModal = false

  showWarningInfoModal = false

  showCircularProgress = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []
  progressValue = 0
  showProgress = false

  languageTag = undefined

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

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.batches,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getBatchesPagMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBatches = model
    })
  }

  getCurrentData() {
    return toJS(this.batches)
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getBatchesPagMy()
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, { images: data.tmpTrackNumberFile, type: 'uploadedFiles' })
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        storekeeperComment: data.storekeeperComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: [...data.trackNumberFile, ...this.uploadedFiles],

        upsTrackNumber: data.upsTrackNumber,
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

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })

    this.getBatchesPagMy()
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
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

      const res = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.rowCount = result.count

        this.volumeWeightCoefficient = res.volumeWeightCoefficient

        this.batches = warehouseBatchesDataConverter(result.rows, this.volumeWeightCoefficient)
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
        this.batches = []
      })
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onClickAddOrEditBatch(setting) {
    try {
      runInAction(() => {
        if (setting.isAdding) {
          this.selectedBatches = []
        }

        this.showCircularProgress = true
      })

      const [boxes, result] = await Promise.all([
        BoxesModel.getBoxesReadyToBatchStorekeeper(),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.boxesData = boxes

        this.showCircularProgress = false
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
        this.showCircularProgress = false
      })
    }
  }

  async onSubmitAddOrEditBatch({ boxesIds, filesToAdd, sourceBoxesIds, batchToEdit, batchFields }) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async setCurrentOpenedBatch(id, notTriggerModal) {
    try {
      const batch = await BatchesModel.getBatchesByGuid(id)
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.curBatch = batch
      })

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      if (!notTriggerModal) {
        this.onTriggerOpenModal('showBatchInfoModal')
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
      console.log(error)
    }
  }

  async confirmSendToStorekeeper(batchId) {
    try {
      await StorekeeperModel.confirmSendToStorekeeper(batchId)
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      this.setFilterRequestStatus(loadingStatuses.isLoading)

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

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)
      console.log(error)
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
