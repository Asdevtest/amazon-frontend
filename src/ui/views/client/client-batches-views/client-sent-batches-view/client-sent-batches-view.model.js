import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientBatchesViewColumns } from '@components/table/table-columns/client/client-batches-columns'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'
import { tableProductViewMode } from '@constants/keys/table-product-view'
import { GeneralModel } from '@models/general-model'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'

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

export class ClientSentBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''
  batches = []
  selectedBatches = []
  curBatch = {}

  currentData = []

  currentStorekeeper = undefined

  storekeepersData = []

  isArchive = false

  hsCodeData = {}
  showEditHSCodeModal = false

  showBatchInfoModal = false

  showWarningInfoModal = false

  showConfirmModal = false

  languageTag = undefined

  productViewMode = tableProductViewMode.EXTENDED

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'

  rowHandlers = {
    changeViewModeHandler: value => this.changeViewModeHandler(value),
  }

  columnsModel = clientBatchesViewColumns(this.rowHandlers, () => this.productViewMode)

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

  constructor({ history }) {
    // console.log('history', history)
    // console.log('location', location)
    runInAction(() => {
      this.history = history
    })

    if (history.location.state) {
      runInAction(() => {
        this.isArchive = history.location.state.isArchive
      })
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.batches,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  onTriggerArchive() {
    runInAction(() => {
      this.selectedBatches = []
    })

    this.isArchive
      ? this.history.push('/client/batches/sent-batches', { isArchive: !this.isArchive })
      : this.history.push('/client/batches/sent-batches/archive', { isArchive: !this.isArchive })
  }

  onClickTriggerArchOrResetProducts() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: this.isArchive ? false : true,
        confirmTitle: this.isArchive
          ? t(TranslationKey['Return to actual batches'])
          : t(TranslationKey['Move a batch']),
        confirmMessage: this.isArchive
          ? t(TranslationKey['After confirmation, the batch will be moved to the actual batches. Continue?'])
          : t(TranslationKey['After confirmation, the batch will be moved to the archive. Move?']),
        onClickConfirm: () => this.onSubmitTriggerArchOrResetProducts(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitTriggerArchOrResetProducts() {
    try {
      await BatchesModel.editUpdateBatches({
        batchIds: [...this.selectedBatches],
        archive: this.isArchive ? false : true,
      })

      this.onTriggerOpenModal('showConfirmModal')
      await this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BATCHES]

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

    this.getBatchesPagMy()
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

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
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

  getCurrentData() {
    return toJS(this.batches)
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(
        [BoxStatus.IN_BATCH_ON_THE_WAY, BoxStatus.FINISH_PREP_CENTR_USA].join(','),
      )

      runInAction(() => {
        this.storekeepersData = result

        this.currentStorekeeper = this.currentStorekeeper ? this.currentStorekeeper : null // result.filter(storekeeper => storekeeper.boxesCount !== 0).sort((a, b) => a.name?.localeCompare(b.name))[0]
      })

      this.getDataGridState()
    } catch (error) {
      console.log(error)
    }
  }

  onClickStorekeeperBtn(storekeeper) {
    runInAction(() => {
      this.selectedBatches = []

      this.currentStorekeeper = storekeeper ? storekeeper : undefined
    })

    this.getBatchesPagMy()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getStorekeepers()
      this.getDataGridState()
      await this.getBatchesPagMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      this.uploadedFiles = []

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, { images: data.tmpTrackNumberFile, type: 'uploadedFiles' })
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        // trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
        trackNumberFile: [...data.trackNumberFile, ...this.uploadedFiles],

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
        status: BatchStatus.HAS_DISPATCHED,
        options: {
          limit: this.paginationModel.pageSize,
          offset: this.paginationModel.page * this.paginationModel.pageSize,

          archive: this.isArchive,

          sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
          sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

          filters: this.getFilter(),
          storekeeperId: this.currentStorekeeper && this.currentStorekeeper._id,
        },
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
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.getBatchesPagMy()
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
      actualShippingCost: cost,
    })

    this.setCurrentOpenedBatch(id, true)
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  changeViewModeHandler(value) {
    this.productViewMode = value
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

        `batches/with_filters?filters=${this.getFilter(column)}&status=${BatchStatus.HAS_DISPATCHED}`,
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
      ]),
    )
  }
}
