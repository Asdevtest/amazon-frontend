import { makeAutoObservable, runInAction, toJS } from 'mobx'

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

import { clientBatchesViewColumns } from '@components/table/table-columns/client/client-batches-columns'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { tableProductViewMode } from '@typings/enums/table-product-view'

import { filtersFields } from './client-sent-batches-view.constants'

export class ClientSentBatchesViewModel {
  history = undefined
  requestStatus = undefined
  nameSearchValue = ''
  batches = []
  selectedBatches = []
  curBatch = undefined
  currentStorekeeperId = undefined
  storekeepersData = []
  isArchive = false
  hsCodeData = undefined
  productViewMode = tableProductViewMode.EXTENDED
  uploadedFiles = []

  showEditHSCodeModal = false
  showBatchInfoModal = false
  showWarningInfoModal = false
  showConfirmModal = false

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

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
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
  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.isArchive = history.location.state.isArchive
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onTriggerArchive() {
    this.selectedBatches = []

    this.isArchive
      ? this.history.push('/client/batches/sent-batches', { isArchive: !this.isArchive })
      : this.history.push('/client/batches/sent-batches/archive', { isArchive: !this.isArchive })
  }

  onClickTriggerArchOrResetProducts() {
    this.confirmModalSettings = {
      isWarning: !this.isArchive,
      confirmTitle: this.isArchive ? t(TranslationKey['Return to actual batches']) : t(TranslationKey['Move a batch']),
      confirmMessage: this.isArchive
        ? t(TranslationKey['After confirmation, the batch will be moved to the actual batches. Continue?'])
        : t(TranslationKey['After confirmation, the batch will be moved to the archive. Move?']),
      onClickConfirm: () => this.onSubmitTriggerArchOrResetProducts(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitTriggerArchOrResetProducts() {
    try {
      await BatchesModel.editUpdateBatches({
        batchIds: this.selectedBatches,
        archive: !this.isArchive,
      })

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.CLIENT_BATCHES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.CLIENT_BATCHES)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.setDataGridState()
    this.getBatchesPagMy()
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

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
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
    try {
      const response = await ProductModel.getProductsHsCodeByGuid(id)

      this.hsCodeData = response

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
        this.storekeepersData = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickStorekeeperBtn(currentStorekeeperId) {
    this.selectedBatches = []
    this.currentStorekeeperId = currentStorekeeperId

    this.getBatchesPagMy()
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getStorekeepers()
      this.getBatchesPagMy()
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
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
        this.curBatch = this.batches.find(batch => this.curBatch._id === batch.originalData._id)?.originalData

        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  async getBatchesPagMy() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await BatchesModel.getBatchesWithFiltersPag({
        status: BatchStatus.HAS_DISPATCHED,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        archive: this.isArchive,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        filters: this.getFilter(),
        storekeeperId: this.currentStorekeeperId,
      })

      runInAction(() => {
        this.rowCount = result.count
        this.batches = warehouseBatchesDataConverter(result.rows, this.platformSettings?.volumeWeightCoefficient)
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      runInAction(() => {
        this.batches = []
      })
      console.error(error)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

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

  async patchActualShippingCostBatch(id, cost) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost,
    })

    this.setCurrentOpenedBatch(id, true)
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  changeViewModeHandler(value) {
    this.productViewMode = value
    this.columnsModel = clientBatchesViewColumns(this.rowHandlers, this.productViewMode)
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

        `batches/with_filters?filters=${this.getFilter(column)}&status=${BatchStatus.HAS_DISPATCHED}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)
      console.error(error)
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
      ]),
    )
  }
}
